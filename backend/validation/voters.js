const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const HttpException = require('./http-exception');

const checkUserExists = async (req, res, next) => {
  const studentId = req.body.studentId;
  const voter = await prisma.voters.findFirst({
    where: {
      studentId,
    },
  });

  if (voter) {
    next(new HttpException(422, 'voter already exist'));
  } else {
    next();
  }
};
module.exports = {
  checkUserExists,
};
