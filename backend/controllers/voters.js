// importing routes and dependencies
const { signVoterToken } = require('../utils/token');
const { validationResult } = require('express-validator');
const HttpException = require('../validation/http-exception');
const prisma = require('../db/prisma-db');

// function for voter login
const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const voter = await prisma.voters.findFirst({
      where: {
        email,
        password,
        del_flg: false,
      },
    });

    if (!voter) {
      return res.status(422).json({
        status: 'fail',
        message: 'Invalid credentials',
      });
    }

    const token = signVoterToken(voter.studentId);

    res.status(200).json({
      status: 'success',
      token,
      user: {
        studentId: voter.studentId,
        studentName: voter.studentName,
        email: voter.email,
        role: voter.role || 'USER',
      },
    });
  } catch (error) {
    console.log(error);
    next(new HttpException(422, error.message));
  }
};

//  function for saving a voter
const createVoter = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const data = req.body;
    const voter = await prisma.voters.create({
      data,
    });

    const voterWithoutPassword = { ...voter };
    delete voterWithoutPassword.password;

    res.status(201).json({
      message: 'Voter created successfully',
      voter: voterWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    next(new HttpException(422, error.message));
  }
};

//  loading all voters
const getAllVoters = async (req, res, next) => {
  try {
    const voters = await prisma.voters.findMany({});

    const votersWithoutPassword = voters.map((voter) => {
      delete voter.password;
      return voter;
    });

    res.status(200).json({
      voters: votersWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    next(new HttpException(422, error.message));
  }
};

// Get me
const getMe = async (req, res, next) => {
  try {
    const studentId = req.user.studentId;
    const voter = await prisma.voters.findFirst({
      where: {
        studentId,
      },
    });
    const voterWithoutPassword = { ...voter };
    delete voterWithoutPassword.password;
    res.status(200).json({
      voter: voterWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    next(new HttpException(422, error.message));
  }
};

//  loading a voter by its id
const getVoterById = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const voter = await prisma.voters.findFirst({
      where: {
        studentId,
      },
    });
    const voterWithoutPassword = { ...voter };
    delete voterWithoutPassword.password;
    res.status(200).json({
      voter: voterWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    next(new HttpException(422, error.message));
  }
};

//  editing a voter
const updateVoter = async (req, res, next) => {
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
    next(new HttpException(422, error.message));
  }
};

//  deleting a voter
const deleteVoter = async (req, res, next) => {
  const studentId = req.params.studentId;

  try {
    const deletedVoter = await prisma.voters.delete({
      where: {
        studentId,
      },
    });

    if (!deletedVoter) {
      return res.status(404).json({
        message: 'Voter not found',
      });
    }
    res.status(201).json({
      message: 'Voter deleted successfully',
    });
  } catch (error) {
    console.log(error);
    next(new HttpException(500, 'an error occurred'));
  }
};

//  exporting all functions
module.exports = {
  getAllVoters,
  getVoterById,
  createVoter,
  updateVoter,
  deleteVoter,
  login,
  getMe,
};
