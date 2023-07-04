//importing all dependencies
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// saving a position
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
    next(new HttpException(401, error.message));

  }
};
//loading all position
const getAllPosition = async (req, res, next) => {
  try {
    const positions = await prisma.positions.findMany({
      include: {
        candidates: true,
      },
    });
    res.status(200).json({
      positions,
    });
  } catch (error) {
    next(new HttpException(422, error.message));

  }
};
//loading position by its id
const getPositionById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const position = await prisma.positions.findUnique({
      where: {
        id,
      },
  
    });
    res.status(200).send(position);
  } catch (error) {
    next(new HttpException(422, error.message));

  }
};
//editing a postion
const updatePosition = async (res, req, next) => {
  const id = req.params.id;
  try {
    const data = req.body;
    const positions = await prisma.positions.update({
      where: {
        id,
      },
      data,
    });
    res.status(200).json({
      positions,
    });
  } catch (error) {
    next(new HttpException(400, error.message));

  }
};
//deleting a position 
const deletePostion = async (req, res, next) => {
  const id = req.params.id;
  try {
    const positions = await prisma.positions.delete({
      where: {
        id,
      },
    });
    res
      .status(204)
      .json(positions, { message: " position is no longer available" });
  } catch (error) {
    next(new HttpException(404, error.message));

  }
};
//exposting all functions
module.exports = {
  getAllPosition,
  getPositionById,
  createPosition,
  updatePosition,
  deletePostion,
};
