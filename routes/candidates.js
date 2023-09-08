// importing express
const { Router } = require('express');

const candidateRouter = Router();

// inmporting multer

const multer = require('multer');

// import express validator
const { check } = require('express-validator');
// importing controller

const candidate = require('../controllers/candidates');

// importing validator

const candidateName = require('../schemes/candidatescheme');

const validation = require('../validation/candidate');

const upload = multer({ dest: 'uploads/' });

//  check if candidate exist then save or reject

candidateRouter.post(
  '/',
  [check('id', 'candidate already exists').isMongoId()],

  upload.single('profile'),

  [...candidateName],
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
