//  importing express
const { Router } = require('express');

const votingRouter = Router();
//  importing controllers,validators,verifiyer
const votes = require('../controllers/voting');

const candidate = require('../controllers/candidates');

const validation = require('../validation/voting');

const verification = require('../verification/verifytoken');

// implementing https methods

votingRouter.get(
  '/candidates/',
  verification.verifyToken,
  candidate.getAllCandidates,
); // load all candidates
votingRouter.post(
  '/',
  verification.verifyToken,
  validation.checkVoteExists,
  validation.doubleVoting,
  votes.addVoting,
); // save a vote
votingRouter.post('/saves/', verification.verifyToken, votes.saveMassvotes);
votingRouter.get('/', verification.verifyToken, votes.getVotes); // load all votes

// exporting voting router
module.exports = votingRouter;
