// importing the web token for authentication
var jwt = require('jsonwebtoken');

// the token function
const signToken = (id) => {
  const secretKey = process.env.SECRET_KEY_USER;
  var token = jwt.sign({ id }, secretKey);

  return token;
};
//  exporting the function

module.exports = {
  signToken,
};
