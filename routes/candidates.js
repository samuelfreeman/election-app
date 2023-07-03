// 
const { Router } = require("express");
const candidateRouter = Router();
//
const candidate = require("../controllers/candidates");
const validation = require("../validation/candidate");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
//check if candidate exist then save or reject 
candidateRouter.post( "/",upload.single("profile"), validation.checkCandidateExists,candidate.saveCandidate);
//all crud routes
candidateRouter.get("/:id", candidate.getSingleCandidateFunc);
candidateRouter.get("/", candidate.getAllCandidates);
candidateRouter.get("/:positionId",candidate.getCandidateByPositionId);
candidateRouter.delete("/:id", candidate.removeCandidateById);
candidateRouter.patch("/:id", candidate.updateCandidate);
//exporting all routes
module.exports = candidateRouter;