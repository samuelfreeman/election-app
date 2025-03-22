const { Router } = require('express');
const positionsRouter = Router();
const positions = require('../controllers/positions');
const verification = require('../verification/verifyusers');
const positionscheme = require('../schemes/positionscheme');
const validation = require('../validation/position');

// All position routes require admin authentication
positionsRouter.use(verification.authenticateAdmin);

positionsRouter.post(
  '/',
  [...positionscheme],
  validation.checkpositionExists,
  positions.createPosition,
);
positionsRouter.get('/', positions.getAllPosition);
positionsRouter.get('/:id', positions.getPositionById);
positionsRouter.delete('/:id', positions.deletePostion);
positionsRouter.patch('/:id', positions.updatePosition);

// exporting module
module.exports = positionsRouter;
