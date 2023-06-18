// const express = require("express");
// const Router = express.Router()
const { Router } = require("express");
const candidateRouter = Router();
const candidate = require("../controllers/candidates");

candidateRouter.post("/", candidate.createCandidateFunc);
candidateRouter.get("/:positionId", candidate.getCandidateByPositionId);
candidateRouter.get("/:id", candidate.getSingleCandidateFunc);
candidateRouter.delete("/", candidate.removeCandidateById);
candidateRouter.patch("/", candidate.updateCandidate);
module.exports = candidateRouter;
