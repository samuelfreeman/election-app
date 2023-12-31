// importing express
const { Router } = require('express');

const votersRouter = Router();

//  importing controllers,validators,verifications

const voters = require('../controllers/voters');

// const candidate = require('../controllers/candidates');
const { check } = require('express-validator');

const voterScheme = require('../utils/schemes/votersScheme');

const validation = require('../validation/voters');

const authentication = require('../validation/auth');

const verification = require('../verification/verifytoken');

//  Routes
votersRouter.post(
  '/',
  [...voterScheme],
  validation.checkUserExists,
  voters.createVoter,
);

votersRouter.get('/login/', authentication.checkEmailExists, voters.login);

votersRouter.get('/', verification.verifyToken, voters.getAllVoters);

votersRouter.get('/:studentId', verification.verifyToken, voters.getVotersById);

votersRouter.delete(
  '/:studentId',
  verification.verifyToken,
  voters.deleteVoter,
);

votersRouter.patch('/:studentId', verification.verifyToken, voters.updateVoter);

//  exporting all routes

module.exports = votersRouter;
