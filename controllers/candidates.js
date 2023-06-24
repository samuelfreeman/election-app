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
    res.status(400).json({
      message: error.message,
    });
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
    res.status(400).json({
      message: error.message,
    });
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
    res.status(200).json({
      candidates,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAllCandidates = async (req,res,next) =>{
  try {
  const candidates  = await prisma.candidates.findMany({
  
  
  })
  
  res.status(200).json({
  
  
  candidates
  
  })
} catch (error) {
  console.log(error);
    res.status(400).json({
      message: error.message, 
})



}
}
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
    res.status(400).json({
      message: error.message,
    });
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
    res.status(204).json({ candidate, message: " this candidate has been removed" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};
module.exports = {
  createCandidateFunc,
  getSingleCandidateFunc,
  updateCandidate,
  getCandidateByPositionId,
  removeCandidateById,
  getAllCandidates
};
