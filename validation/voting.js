const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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
    return res.status(422).json({
      message: "vote already exists",
    });
  } else {
    next();
  }
};
module.exports = {
  checkVoteExists,
};
