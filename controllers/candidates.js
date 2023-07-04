//
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cloudinary = require("../utils/cloudinary");
const HttpException = require("../validation/http-exception");

//saving a candidate
const saveCandidate = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const photo = req.file ? req.file.path : undefined;

    if (photo) {
      const uploaded = await cloudinary.uploader.upload(photo, {
        folder: "election/candidates",
      });
      if (uploaded) {
        data.profile = uploaded.secure_url;
      }
    }
    const candidates = await prisma.candidates.create({
      data,
    });

    res.status(201).json({
      candidates,
    });
  } catch (error) {
    next(new HttpException(201, error.message));
    // console.log(error);
    // res.status(422).json({
    //   message: error.message,
    // });
  }
};
//loading a single candidate
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
    next(new HttpException(400, error.message));
    // console.log(error);
    // res.status(400).json({
    //   message: error.message,
    // });
  }
};
//updating a candidate
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
    next(new HttpException(400, error.message));
    // console.log(error);
    // res.status(400).json({
    //   message: error.message,
    // });
  }
};
//loading all candidates
const getAllCandidates = async (req, res, next) => {
  try {
    const candidates = await prisma.candidates.findMany({});
    res.status(200).json({
      candidates,
    });
  } catch (error) {
    next(new HttpException(400, error.message));
    // console.log(error);
    // res.status(400).json({
    //   message: error.message,
    // });
  }
};
// loading a candidate by its position id
const getCandidateByPositionId = async (req, res, next) => {
  try {
    const positionId = req.params.positionId;
    console.log(req.params);
    const candidate = await prisma.candidates.findFirst({
      where: {
        positionId,
      },
    });
    res.status(200).json({
      candidate,
    });
  } catch (error) {
    console.log(error);
    next(new HttpException(400, error.message));

    
  }
};

//deleting a candidate
const removeCandidateById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const candidate = await prisma.candidates.delete({
      where: {
        id,
      },
    });
    res
      .status(204)
      .json({ candidate, message: " this candidate has been removed" });
  } catch (error) {
    next(new HttpException(422, error.message));
    // console.log(error);
    // res.status(400).json({
    //   message: error.message,
    // });
  }
};
//exporting the functions
module.exports = {
  saveCandidate,
  getSingleCandidateFunc,
  updateCandidate,
  getCandidateByPositionId,
  removeCandidateById,
  getAllCandidates,
};
