const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createVoter = async (req, res, next) => {
  try {
    const data = req.body;
    const voters = await prisma.voters.create({
      data,
    });
    res.status(201).json({
      voters,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllVoters = async (req, res, next) => {
  try {
    const voters = await prisma.voters.findMany({
      
    });
    res.status(201).json({
      voters,
    });
  } catch (error) {
    console.log(error);
  }
};


const getVotersById = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const voter = await prisma.voters.findFirst({
      where: {
        studentId: studentId
      }
    });
    res.json(voter);
  } catch (error) {
    next(error);
  }
};


const updateVoter = async (res, req, next) => {
  try {
    const studentId = req.params.studentId;
    const data = req.body;
    const voters = await prisma.voters.update({
      where: {
        studentId,
      },
      data,
    });
    res.status(201).json({
      voters,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteVoter = async (req, res, next) => {
  const studentId = req.params.studentId;
  try {
    const voters = await prisma.voters.delete({
      where: {
        studentId,
      },
    });
    res.status(404).json(voters, { message: " this voter has been removed" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllVoters,
  getVotersById,
  createVoter,
  updateVoter,
  deleteVoter,
};
