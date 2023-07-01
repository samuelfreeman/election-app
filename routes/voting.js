//importing express
const { Router } = require("express");
const votingRouter = Router();
//importing controller
const votes = require("../controllers/voting");
const validation = require("../validation/voting")
// implementing https methods
votingRouter.post("/",validation.checkVoteExists ,votes.addVoting);
//exporting voting router
module.exports = votingRouter;
