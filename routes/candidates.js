// importing express
const { Router } = require('express');

const candidateRouter = Router();

// inmporting multer

const multer = require('multer');
// importing controller
const candidate = require('../controllers/candidates');

// importing validator

const validation = require('../validation/candidate');

const upload = multer({ dest: 'uploads/' });

//  check if candidate exist then save or reject
candidateRouter.post(
  '/',
  upload.single('profile'),
  validation.checkCandidate,
  candidate.saveCandidate,
);
//  all crud routes
candidateRouter.get('/:id', candidate.getSingleCandidateFunc);

candidateRouter.get('/', candidate.getAllCandidates);

candidateRouter.get('/:positionId', candidate.getCandidateByPositionId);

candidateRouter.delete('/:id', candidate.removeCandidateById);

candidateRouter.patch('/:id', candidate.updateCandidate);

//  exporting all routes

module.exports = candidateRouter;
