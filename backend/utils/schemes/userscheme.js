const { check } = require('express-validator');

const userScheme = [
  check('fullname', 'name is required').notEmpty().isString(),
  check('email', 'is required').isEmail(),
  check('password', 'password is required').notEmpty(),
];

module.exports = userScheme;
