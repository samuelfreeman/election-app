// importing the web token for autentication

var jwt = require('jsonwebtoken');

// the token function

const signToken = (id) => {
  const secretKey = process.env.SECRET_KEY;
  var token = jwt.sign({ id }, secretKey);

  return token;
};
// expoting the signToken

module.exports = {
  signToken,
};
