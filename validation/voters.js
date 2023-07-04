const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const checkUserExists = async (req, res, next) => {
  const studentId = req.body.studentId;
  const voter = await prisma.voters.findFirst({
    where: {
      studentId,
    },
  });

  if (voter) {
    return   next(new HttpException(422, "voter already exist"));

  } else {
    next();
  }
};
module.exports = {
  checkUserExists,
};
