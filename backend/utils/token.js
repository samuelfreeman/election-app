// importing the web token for authentication
var jwt = require('jsonwebtoken');

// the token function for admin users
const signToken = (id, role = 'ADMIN') => {
  const secretKey = process.env.SECRET_KEY;
  var token = jwt.sign({ id, role }, secretKey);

  return token;
};

// the token function for voter users
const signVoterToken = (studentId) => {
  const secretKey = process.env.SECRET_KEY;
  var token = jwt.sign({ id: studentId, role: 'USER' }, secretKey);

  return token;
};

//  exporting the functions
module.exports = {
  signToken,
  signVoterToken,
};
