//importing all dependencies
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const HttpException = require("../validation/http-exception")

//saving a voter
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
    next(new HttpException(422, error.message));
    // console.log(error);
    // res.status(422).json({
    //   message: error.message,
    // });
  }
};
// loading all votes
const getVotes = async (req, res, next) => {
  try {
    const votes = await prisma.voting.findMany({});
    res.status(200).json({
      votes,
    });
  } catch (error) {
    console.log(error);
    next(new HttpException(400, error.message));

    // res.status(400).json({
    //   message: error.message,
    // });
  }
};

//exporting all functions
module.exports = {
  addVoting,
  getVotes,
};
