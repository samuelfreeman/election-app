// importing all dependencies
const { PrismaClient } = require('@prisma/client');

const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

const HttpException = require('../validation/http-exception');
// saving a voter
const addVoting = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const data = req.body;

    const votes = await prisma.voting.create({
      data,
    });
    res.status(201).json({
      votes,
    });
  } catch (error) {
    next(new HttpException(422, error.message));
  }
};
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
// loading all votes
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
