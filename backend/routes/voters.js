// importing express
const { Router } = require('express');
const votersRouter = Router();
const voters = require('../controllers/voters');
const voterScheme = require('../schemes/votersScheme');
const validation = require('../validation/voters');
const authentication = require('../validation/auth');
const verification = require('../verification/verifytoken');
const { authenticateAdmin, userToken } = require('../verification/verifyusers');

//  Routes
votersRouter.post(
  '/register',
  [...voterScheme],
  validation.checkUserExists,
  voters.createVoter,
);

votersRouter.post('/login', authentication.checkEmailExists, voters.login);

// Admin route
votersRouter.get('/', authenticateAdmin, voters.getAllVoters);

// Get me
votersRouter.get('/profile', userToken, voters.getMe);
votersRouter.get('/:studentId', verification.verifyToken, voters.getVoterById);

votersRouter.patch(
  '/update/:studentId',
  verification.verifyToken,
  voters.updateVoter,
);
votersRouter.delete(
  '/:studentId',
  verification.verifyToken,
  voters.deleteVoter,
);

//  exporting all routes
module.exports = votersRouter;
