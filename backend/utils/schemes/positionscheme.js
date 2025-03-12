const { check } = require('express-validator');

const positionscheme = [
  check('positionName', 'position does not exist').exists().isString(),
  check('description', 'must be string').isString(),
  check('id', 'must be a mongoId').isMongoId(),
];

module.exports = positionscheme;
