// importing dependencies.
const { validationResult } = require('express-validator');
const cloudinary = require('../utils/cloudinary');
const HttpException = require('../validation/http-exception');
const prisma = require('../db/prisma-db');

// saving a candidate
const saveCandidate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const data = req.body;
    const photo = req.file ? req.file.path : undefined;
    if (photo) {
      const uploaded = await cloudinary.uploader.upload(photo, {
        folder: 'election/candidates',
      });
      if (uploaded) {
        data.profile = uploaded.secure_url;
      }
    }
    const candidate = await prisma.candidates.create({
      data,
    });
    res.status(201).json({
      message: 'Candidate created successfully',
      candidate,
    });
  } catch (error) {
    next(new HttpException(422, error.message));
  }
};

// loading a single candidate
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
  }
};

// updating a candidate
const updateCandidate = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const candidate = await prisma.candidates.update({
      where: {
        id,
      },
      data,
    });
    res.status(201).json({
      candidate,
    });
  } catch (error) {
    next(new HttpException(401, error.message));
  }
};
// loading all candidates
const getAllCandidates = async (req, res, next) => {
  try {
    const { skip, take } = req.query;

    const candidates = await prisma.candidates.findMany({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      include: {
        positions: true,
      },
    });

    res.status(200).json({
      candidates,
    });
  } catch (error) {
    next(new HttpException(400, error.message));
  }
};
// loading a candidate by its position id
const getCandidateByPositionId = async (req, res, next) => {
  try {
    const positionId = req.params.positionId;
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

// deleting a candidate
const removeCandidateById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const candidate = await prisma.candidates.delete({
      where: {
        id,
      },
    });
    res.status(204).json({ message: 'Candidate deleted successfully!' });
  } catch (error) {
    next(new HttpException(422, error.message));
  }
};
// exporting the functions
module.exports = {
  saveCandidate,
  getSingleCandidateFunc,
  updateCandidate,
  getCandidateByPositionId,
  removeCandidateById,
  getAllCandidates,
};
