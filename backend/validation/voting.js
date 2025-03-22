const prisma = require('../db/prisma-db');
const HttpException = require('./http-exception');

const checkVoteExists = async (req, res, next) => {
  const { voterId, candidateId, positionId } = req.body;
  const voter = await prisma.voting.findFirst({
    where: {
      voterId,
      candidateId,
      positionId,
    },
  });

  if (voter) {
    next(new HttpException(422, 'Individual has voted already'));
  }

  next();
};
const doubleVoting = async (req, res, next) => {
  const { voterId, positionId } = req.body;
  const voter = await prisma.voting.findFirst({
    where: {
      voterId,
      positionId,
    },
  });

  if (voter) {
    next(new HttpException(422, 'Double voting not permited'));
  }

  next();
};

module.exports = {
  checkVoteExists,
  doubleVoting,
};
