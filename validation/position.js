const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const HttpException = require("../validation/http-exception")

const checkpositionExists = async (req, res, next) => {
  const positionName = req.body.positionName;
  const position = await prisma.positions.findUnique({
    where: {
      positionName,
    },
  });

  if (position) {
    return     next(new HttpException(422, "Position already exists"));

  } else {
    next();
  }
};
module.exports = {
  checkpositionExists,
};
