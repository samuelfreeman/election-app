const { check } = require('express-validator');

const voterscheme = [
  check('studentName', 'student name is required').exists().notEmpty.isString(),
  check('email', 'email is required').isEmail().notEmpty,
  check('password', 'password is required').notEmpty(),
];

model.exports = voterscheme;
