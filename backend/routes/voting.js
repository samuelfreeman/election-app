//  importing express
const { Router } = require('express');
const votingRouter = Router();
const votes = require('../controllers/voting');
const candidate = require('../controllers/candidates');
const votingscheme = require('../schemes/votingscheme');
const validation = require('../validation/voting');
const verification = require('../verification/verifytoken');
const authenticateUser = require('../verification/verifyusers');

// load all candidates
votingRouter.get('/candidates', candidate.getAllCandidates);

// get my votes
votingRouter.get('/my-votes', authenticateUser.userToken, votes.getMyVotes);
// save multiple votes
votingRouter.post('/bulk-vote', verification.verifyToken, votes.saveMassvotes);

// save single vote
votingRouter.post(
  '/vote',
  [...votingscheme],
  authenticateUser.userToken,
  validation.checkVoteExists,
  validation.doubleVoting,
  votes.addVoting,
);

// exporting voting router
module.exports = votingRouter;
