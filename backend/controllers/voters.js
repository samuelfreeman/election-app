// importing routes and dependencies

const { PrismaClient } = require('@prisma/client');

const { signToken } = require('../utils/token');

const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

const HttpException = require('../validation/http-exception');

// function for voter login
const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const voters = await prisma.voters.findFirst({
      where: {
        email,
        password,
      },
    });
    console.log(voters);
    if (!voters) {
      res.status(422).json({
        message: 'Invalid Password',
      });
    } else {
      const token = signToken(voters.studentId);
      res.status(200).json({
        token,
      });
    }
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
    const voters = await prisma.voters.create({
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
//  loading all voters
const getAllVoters = async (req, res, next) => {
  try {
    const voters = await prisma.voters.findMany({});
    res.status(200).json({
      voters,
    });
  } catch (error) {
    console.log(error);
    next(new HttpException(422, error.message));
  }
};
//  loading a voter by its id
const getVotersById = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const voter = await prisma.voters.findFirst({
      where: {
        studentId,
      },
    });
    res.status(200).json(voter);
  } catch (error) {
    console.log(error);
    next(new HttpException(422, error.message));
  }
};
//  editing a voter
const updateVoter = async (req, res, next) => {
  try {
    console.log(req.params);
    console.log('===================');
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
    if (deletedVoter) {
      res.status(201).json({
        message: 'Voter deleted successfully',
      });
    } else {
      next(new HttpException(404, 'Voter not found'));
    }
  } catch (error) {
    console.log(error);
    next(new HttpException(500, 'an error occurred'));
  }
};
//  exporting all functions
module.exports = {
  getAllVoters,
  getVotersById,
  createVoter,
  updateVoter,
  deleteVoter,
  login,
};
