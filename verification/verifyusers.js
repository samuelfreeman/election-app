const jwt = require('jsonwebtoken');

const userToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'Access Denied',
        token,
      });
    }
    try {
      const verified = jwt.verify(token, process.env.SECRET_KEY_USER);
      req.user = verified;
      next();
    } catch (error) {
      res.status(403).json({
        status: 'fail',
        message: 'Invalid Token',
        token,
      });
    }
  }
  return res.status(500).json({
    status: 'fail',
    message: 'No Header Available',
  });
};
module.exports = {
  userToken,
};
