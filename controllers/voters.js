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
    res.status(422).json({
      message: error.message,
    });
  }

};

const getAllVoters = async (req, res, next) => {
  try {
    const voters = await prisma.voters.findMany({
      
    });
    res.status(200).json({
      voters,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
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
    res.status(200).json(voter);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: error.message,
    });
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
    res.status(200).json({
      voters,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};
const deleteVoter = async (req, res, next) => {
  const studentId = req.params.studentId;
  try {
    const deletedVoter = await prisma.voters.delete({
      where: {
        studentId,
      },
    });
    if (deletedVoter) {
      res.status(200).json({
        message: 'Voter deleted successfully',
      });
    } else {
      res.status(404).json({
        message: 'Voter not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'An error occurred',
    });
  }
};

module.exports = {
  getAllVoters,
  getVotersById,
  createVoter,
  updateVoter,
  deleteVoter,
};
