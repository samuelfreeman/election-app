//  importing all dependencies
const { validationResult } = require('express-validator');
const HttpException = require('../validation/http-exception');
const prisma = require('../db/prisma-db');
const { signToken } = require('../utils/token');

//  login functinion for admins/users
const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });
    if (!user) {
      res.status(422).json({
        message: 'Invalid credentials',
      });
    } else {
      const token = signToken(user.id, user.role || 'ADMIN');
      res.status(200).json({
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role || 'ADMIN',
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(new HttpException(422, error.message));
  }
};

//  saving  a user
const saveUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const data = req.body;
    const user = await prisma.user.create({
      data,
    });
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    next(new HttpException(422, error.message));
  }
};

// Get user from token
const getMe = async (req, res, next) => {
  try {
    // Make sure user is attached to the request by the middleware
    if (!req.user) {
      return res.status(401).json({
        status: 'fail',
        message: 'User not authenticated',
      });
    }

    // Get user ID from the token payload
    const userId = req.user.id;
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    res.status(200).json({
      user: userWithoutPassword,
    });
  } catch (error) {
    next(new HttpException(422, error.message));
  }
};

//  loading all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({});

    const usersWithoutPassword = users.map((user) => {
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      return userWithoutPassword;
    });

    res.status(200).json({
      users: usersWithoutPassword,
    });
  } catch (error) {
    next(new HttpException(400, error.message));
  }
};
//  loading a single user
const getSingleUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    res.status(200).json({
      user: userWithoutPassword,
    });
  } catch (error) {
    next(new HttpException(422, error.message));
  }
};
//  editing a user
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(new HttpException(422, error.message));
  }
};
//  deleting a user
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(new HttpException(422, error.message));
  }
};
//  exporting a functions
module.exports = {
  login,
  saveUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
  getMe,
};
