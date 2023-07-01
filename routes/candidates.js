// const express = require("express");
// const Router = express.Router()
const { Router } = require("express");
const candidateRouter = Router();

const candidate = require("../controllers/candidates");
const validation = require("../validation/candidate");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

candidateRouter.post(
  "/",
  upload.single("profile"),
  validation.checkCandidateExists,
  candidate.createCandidateFunc
);
candidateRouter.get("/:id", candidate.getSingleCandidateFunc);
candidateRouter.get("/", candidate.getAllCandidates);
candidateRouter.get("/:positionId", candidate.getCandidateByPositionId);
candidateRouter.delete("/:id", candidate.removeCandidateById);
candidateRouter.patch("/:id", candidate.updateCandidate);

module.exports = candidateRouter;
