//importing express
const { Router } = require("express");
const votingRouter = Router();
//importing controller
const votes = require("../controllers/voting");
// implementing https methods
votingRouter.post("/", votes.addVoting);
//exporting voting router
module.exports = votingRouter;
