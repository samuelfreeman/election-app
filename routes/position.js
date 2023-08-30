//  importing express

const { Router } = require('express');

const positionsRouter = Router();

//  importing controllers

const positions = require('../controllers/positions');

// importing validator

const validation = require('../validation/position');

positionsRouter.post(
  '/',
  validation.checkpositionExists,
  positions.createPosition,
);

positionsRouter.get('/', positions.getAllPosition);

positionsRouter.get('/:id', positions.getPositionById);

positionsRouter.delete('/:id', positions.deletePostion);

positionsRouter.patch('/:id', positions.updatePosition);

// exporting module

module.exports = positionsRouter;
