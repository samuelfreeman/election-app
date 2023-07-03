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
    return res.status(422).json({
      message: "user already exists",
    });
  } else {
    next();
  }
};
module.exports = {
  checkUserExists,
};
