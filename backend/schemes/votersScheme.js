const { check } = require('express-validator');

const voterscheme = [
  check('studentName', 'student name is required')
    .isMongoId()
    .exists()
    .notEmpty(),
  check('email', 'email is required').isEmail().notEmpty(),
  check('password', 'password is required').notEmpty(),
];

module.exports = voterscheme;
