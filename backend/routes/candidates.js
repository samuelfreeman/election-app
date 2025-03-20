// importing express
const { Router } = require('express');
const candidateRouter = Router();
const multer = require('multer');
const { check } = require('express-validator');
const candidate = require('../controllers/candidates');
const candidateName = require('../schemes/candidatescheme');
const verification = require('../verification/verifyusers');
const validation = require('../validation/candidate');
const upload = multer({ dest: 'uploads/' });

// All candidate routes require admin authentication
candidateRouter.use(verification.authenticateAdmin);

// check if candidate exist then save or reject
candidateRouter.post(
  '/',
  [check('id', 'candidate already exists').isMongoId()],
  upload.single('profile'),
  [...candidateName],
  validation.checkCandidate,
  candidate.saveCandidate,
);

//  all crud routes
candidateRouter.get('/', candidate.getAllCandidates);
// get candidate by id
candidateRouter.get('/:id', candidate.getSingleCandidateFunc);
// get candidate by position id
candidateRouter.get('/:positionId', candidate.getCandidateByPositionId);
// update candidate
candidateRouter.patch('/update/:id', candidate.updateCandidate);
// delete candidate
candidateRouter.delete('/:id', candidate.removeCandidateById);

//  exporting all routes
module.exports = candidateRouter;
