//importing express
const { Router } = require("express");
const votingRouter = Router();
//importing controller
const votes = require("../controllers/voting");
const validation = require("../validation/voting");
const candidate = require("../controllers/candidates");
const verification = require("../verification/verifytoken");
// implementing https methods
votingRouter.get("/candidates/:positionId",candidate.getCandidateByPositionId);//load all candidates
votingRouter.post("/",validation.checkVoteExists, votes.addVoting);//save a vote
votingRouter.get("/",votes.getVotes);//load all votes
//exporting voting router
module.exports = votingRouter;
