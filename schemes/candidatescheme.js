const { check } = require('express-validator');

const candidateScheme = [
  check('candidateName')
    .trim()
    .exists()
    .withMessage('candidate already exists'),
];

module.exports = candidateScheme;
