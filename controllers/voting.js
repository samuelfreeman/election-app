const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addVoting = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const votes = await prisma.voting.create({
      data,
    });
    res.status(201).json({
      votes,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  addVoting,
};
