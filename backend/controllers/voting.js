// importing all dependencies
const { validationResult } = require('express-validator');
const HttpException = require('../validation/http-exception');
const prisma = require('../db/prisma-db');

// saving a vote
const addVoting = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const data = req.body;
    const vote = await prisma.voting.create({
      data,
    });
    res.status(201).json({
      message: 'Vote saved successfully',
      vote,
    });
  } catch (error) {
    next(new HttpException(422, error.message));
  }
};

// saving multiple votes
const saveMassvotes = async (req, res, next) => {
  try {
    const data = req.body;

    const votes = await prisma.voting.createMany({
      data,
    });
    res.status(201).json({
      votes,
    });
  } catch (error) {
    next(new HttpException(422, error.message));
  }
};

// Get votes made by the currently logged-in user
const getMyVotes = async (req, res, next) => {
  try {
    // Get the current user's ID from the request object
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        status: 'fail',
        message: 'User not authenticated',
      });
    }

    const userId = req.user.id;

    // Fetch votes for the current user with position and candidate details
    const votes = await prisma.voting.findMany({
      where: {
        voterId: userId,
      },
      include: {
        positions: {
          select: {
            id: true,
            positionName: true,
            description: true,
          },
        },
        candidates: {
          select: {
            id: true,
            candidateName: true,
            profile: true,
          },
        },
      },
    });

    // Format the response
    const formattedVotes = votes.map((vote) => ({
      id: vote.id,
      position: vote.positions
        ? {
            id: vote.positions.id,
            name: vote.positions.positionName,
            description: vote.positions.description,
          }
        : null,
      candidate: vote.candidates
        ? {
            id: vote.candidates.id,
            name: vote.candidates.candidateName,
            profile: vote.candidates.profile,
          }
        : null,
      votedAt: vote.createdAt,
    }));

    res.status(200).json({
      status: 'success',
      count: formattedVotes.length,
      votes: formattedVotes,
    });
  } catch (error) {
    next(new HttpException(500, error.message));
  }
};

// loading my votes
const getVotes = async (req, res, next) => {
  try {
    // Get vote counts grouped by position and candidate
    const voteGroups = await prisma.voting.groupBy({
      by: ['positionId', 'candidateId'],
      _count: {
        voterId: true,
      },
    });

    // Get total vote count
    const totalVotes = await prisma.voting.count();

    // Get position and candidate details for each vote group
    const detailedVotes = await Promise.all(
      voteGroups.map(async (voteGroup) => {
        const position = await prisma.positions.findUnique({
          where: { id: voteGroup.positionId },
          select: { id: true, positionName: true, description: true },
        });

        const candidate = await prisma.candidates.findUnique({
          where: { id: voteGroup.candidateId },
          select: { id: true, candidateName: true, profile: true },
        });

        return {
          position: position || {
            id: voteGroup.positionId,
            positionName: 'Unknown Position',
          },
          candidate: candidate || {
            id: voteGroup.candidateId,
            candidateName: 'Unknown Candidate',
          },
          voteCount: voteGroup._count.voterId,
        };
      }),
    );

    // Group by position for better organization
    const votesByPosition = {};
    detailedVotes.forEach((vote) => {
      const positionId = vote.position.id;
      if (!votesByPosition[positionId]) {
        votesByPosition[positionId] = {
          position: vote.position,
          candidates: [],
          totalVotesForPosition: 0,
        };
      }
      votesByPosition[positionId].candidates.push({
        candidate: vote.candidate,
        voteCount: vote.voteCount,
      });
      votesByPosition[positionId].totalVotesForPosition += vote.voteCount;
    });

    res.status(200).json({
      status: 'success',
      totalVotes,
      positions: Object.values(votesByPosition),
    });
  } catch (error) {
    next(new HttpException(500, error.message));
  }
};

// exporting all functions

module.exports = {
  addVoting,
  getVotes,
  saveMassvotes,
  getMyVotes,
};
