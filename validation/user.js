const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const checkUserExists = async (req, res, next) => {
  const email = req.body.email;
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    return     next(new HttpException(422, "User already exist"));

  } else {
    next();
  }
};
module.exports = {
  checkUserExists,
};
