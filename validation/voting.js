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
    return     next(new HttpException(422, "individual has voted already"));

  } else {
    next();
  }
};
module.exports = {
  checkVoteExists,
};
