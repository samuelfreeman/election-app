// const express = require("express");
// const Router = express.Router()
const { Router } = require("express");
const candidateRouter = Router();
const candidate = require("../controllers/candidates");

candidateRouter.post("/", candidate.createCandidateFunc);
candidateRouter.get("/:id", candidate.getSingleCandidateFunc);
candidateRouter.get("/:positionId", candidate.getCandidateByPositionId);
candidateRouter.delete("/:id", candidate.removeCandidateById);
candidateRouter.patch("/:id", candidate.updateCandidate);
module.exports = candidateRouter;
