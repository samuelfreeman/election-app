//  importing prisma
const prisma = require('../db/prisma-db');
const HttpException = require('./http-exception');

//  validating candidate
const checkCandidate = async (req, res, next) => {
  const candidateName = req.body.candidateName;
  const candidate = await prisma.candidates.findFirst({
    where: {
      candidateName,
    },
  });

  if (candidate) {
    next(new HttpException(422, 'candidate already exists'));
  } else {
    next();
  }
};

//  exporting the function

module.exports = {
  checkCandidate,
};
