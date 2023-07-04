//importing prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const HttpException = require("../validation/http-exception")
//validating candidate
const checkCandidateExists = async (req, res, next) => {
  const candidateName = req.body.candidateName;
  const candidate = await prisma.candidates.findFirst({
    where: {
      candidateName,
    
    },
  });

  if (candidate) {
    return     next(new HttpException(422, "candidate already exists"));

  } else {
    next();
  }
};
//exporting the function
module.exports = {
  checkCandidateExists,
};
