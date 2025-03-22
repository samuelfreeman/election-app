// importing the prisma dependency
const prisma = require('../db/prisma-db');
const HttpException = require('./http-exception');

// authenticating voter email
const checkEmailExists = async (req, res, next) => {
  const email = req.body.email;
  const voters = await prisma.voters.findFirst({
    where: {
      email,
    },
  });

  if (!voters) {
    res.status(422).json({
      message: 'Please sign up!',
    });
  } else {
    next();
  }
};

// authenticating user email
const userEmail = async (req, res, next) => {
  const email = req.body.email;
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    next(new HttpException(422, 'Please sign up!'));
  } else {
    next();
  }
};
module.exports = {
  checkEmailExists,
  userEmail,
};
