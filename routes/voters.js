// const express = require("express");
// const Router = express.Router();
const { Router } = require("express");
const votersRouter = Router();
const voters = require("../controllers/voters");

votersRouter.post("/", voters.createVoter);
votersRouter.get("/", voters.getAllVoters);
votersRouter.get("/:studentId", voters.getVotersById);
votersRouter.delete("/:studentId", voters.deleteVoter);
votersRouter.patch("/:studentId", voters.updateVoter);
module.exports = votersRouter;
