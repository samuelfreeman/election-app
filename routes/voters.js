//
const { Router } = require("express");
const votersRouter = Router();
//importing 
const voters = require("../controllers/voters");
const validation = require("../validation/voters");
const authentication = require("../validation/auth"); 
const verification = require("../verification/verifytoken");
const candidate = require("../controllers/candidates");
//Routes
votersRouter.post("/", validation.checkUserExists, voters.createVoter);
votersRouter.get("/login/",authentication.checkEmailExists,voters.login);
votersRouter.get("/",verification.verifyToken, voters.getAllVoters);
votersRouter.get("/candidates/",verification.verifyToken,candidate.getAllCandidates)
votersRouter.get("/:studentId",verification.verifyToken, voters.getVotersById);
votersRouter.delete("/:studentId",verification.verifyToken, voters.deleteVoter);
votersRouter.patch("/:studentId", voters.updateVoter);
//exporting all routes
module.exports = votersRouter;
