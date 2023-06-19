const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createCandidateFunc = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const candidates = await prisma.candidates.create({
      data,
    });
    

    res.status(201).json({
      candidates,
    });
   
  } catch (error) {
    console.log(error);
  }
};

const getSingleCandidateFunc = async (req, res, next) => {
  const id = req.params.id;
  try {
    const candidate = await prisma.candidates.findUnique({
      where: {
        id,
      },
    
    });
    res.status(200).json({
      candidate,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCandidate = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const candidates = await prisma.candidates.update({
      where: {
        id,
      },
      data,
    });
    res.status(201).json({
      candidates,
    });
  } catch (error) {
    console.log(error);
  }
};
const getCandidateByPositionId = async (req, res, next) => {
  const positionsId = req.params.positionsId;
  try {
    const candidate = await prisma.candidates.findUnique({
      where: {
        positionsId,
      },
    });
    res.status(200).json(candidate);
  } catch (error) {
    console.log(error);
  }
};

const removeCandidateById = async (req, res, next) => {
  const id = req.params.id;
  
  try {
    const candidate = await prisma.candidates.delete({
      where: {
        id,
      },
  
    });
    res.status(200).send("Candidate has been deleted")
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createCandidateFunc,
  getSingleCandidateFunc,
  updateCandidate,
  getCandidateByPositionId,
  removeCandidateById,
};
