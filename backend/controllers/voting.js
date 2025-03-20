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

// loading my votes
const getVotes = async (req, res, next) => {
  try {
    const votes = await prisma.voting.groupBy({
      by: ['positionId', 'candidateId'],
      _count: {
        voterId: true,
      },
    });

    res.status(200).json({
      votes,
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
};
