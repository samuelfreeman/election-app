const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createPosition = async (req, res, next) => {
  try {
    const data = req.body;
    const positions = await prisma.positions.create({
      data,
    });
    res.status(201).json({
        positions,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllPosition = async (req, res, next) => {
  try {
    const data = req.body;
    const positions = await prisma.positions.findMany({
      data,
    });
    res.status(201).json({
        positions,
    });
  } catch (error) {
    console.log(error);
  }
};

const  getPositionById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const positions = await prisma.positions.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json({
        positions,
    });
  } catch (error) {
    console.log(error);
  }
};
const updatePosition = async (res, req, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const positions = await prisma.positions.update({
      where: {
        id,
      },
      data,
    });
    res.status(201).json({
        positions,
    });
  } catch (error) {
    console.log(error);
  }
};
const deletePostion = async (req, res, next) => {
  const id = req.params.id;
  try {
    const positions = await prisma.positions.delete({
      where: {
        id,
      },
    });
    res.status(404).json(positions, { message: " this voter has been removed" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllPosition,
  getPositionById,
  createPosition,
  updatePosition,
  deletePostion,
};
