// const express = require("express");
// const Router = express.Router();
const { Router } = require("express");
const votersRouter = Router();
const voters = require("../controllers/voters");

votersRouter.post("/", voters.createVoter);
votersRouter.get("/", voters.getAllVoters);
votersRouter.get("/:id", voters.getVotersById);
votersRouter.delete("/", voters.deleteVoter);
votersRouter.patch("/", voters.updateVoter);
module.exports = votersRouter;
