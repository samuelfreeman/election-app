const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const HttpException = require('./http-exception');

const checkVoteExists = async (req, res, next) => {
  const voterId = req.body.voterId;
  const candidateId = req.body.candidateId;
  const positionId = req.body.positionId;
  const voter = await prisma.voting.findFirst({
    where: {
      voterId,
      candidateId,
      positionId,
    },
  });
  if (voter) {
    next(new HttpException(422, 'individual has voted already'));
  } else {
    next();
  }
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
  res.status(200).json({
    voter,
  });
};
module.exports = {
  checkVoteExists,
  doubleVoting,
};
