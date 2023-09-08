const { check } = require('express-validator');

const votingscheme = [
  check('positionId', 'positionId is required').notEmpty().isMongoId(),
  check('candidateId', 'candidateId is required').notEmpty().isMongoId,
  check('voterId', 'voterId is required').notEmpty().isMongoId(),
];

model.exports = votingscheme;
