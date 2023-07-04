//importing all dependencies
const { PrismaClient } = require("@prisma/client");
const { signToken } = require("../utils/usertoken");
const prisma = new PrismaClient();
//login functinion for admins/users
const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const users = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });
    console.log(users);
    if (!users) {
      return res.status(422).json({
        message: "Invalid Password",
      });
    } else {
      const token = signToken(users.id);
      res.status(200).json({
        token,
      });
    }
  } catch (error) {
    console.log(error);
    next(new HttpException(422, error.message));

    // res.status(400).json({
    //   message: error.message,
    // });
  }
};
//saving  a user
const saveUser = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await prisma.user.create({
      data,
    });
    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log(error);
    next(new HttpException(422, error.message));

    // res.status(422).json({
    //   message: error.message,
    // });
  }
};
//loading all users
const getAllUsers = async (req, res, next) => {
  try {
    const user = await prisma.user.findMany({});
    res.status(200).json({
      user,
    });
  } catch (error) {
    next(new HttpException(400, error.message));

    // console.log(error);
    // res.status(422).json({
    //   message: error.message,
    // });
  }
};
//loading a single user
const getSingleUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(new HttpException(422, error.message));

    // console.log(error);
    // res.status(422).json({
    //   message: error.message,
    // });
  }
};
//editing a user
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

    // console.log(error);
    // res.status(422).json({
    //   message: error.message,
    // });
  }
};
//deleting a user
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(new HttpException(422, error.message));

};
}
//exporting a functions
module.exports = {
  login,
  saveUser,
  deleteUser,
  updateUser,
  getSingleUser,
  getAllUsers,
};
