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
    const positions = await prisma.positions.findMany({
    });
    res.status(201).json({
        positions,
    });
  } catch (error) {
    console.log(error);
  }
};

const  getPositionById = async (req, res, next) => {
  
    const id = req.params.id;
  
    try {
      const position = await prisma.positions.delete({
        where: {
          id,
        },
    
      });
      res.status(200).send("position is no longer available");
    } catch (error) {
      console.log(error);
    }
}
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
      res.status(201).json({
        positions,
      });
    } catch (error) {
      console.log(error);
    }
};
const deletePostion = async (req, res, next) => {
  const id = req.params.id;
  try{
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
