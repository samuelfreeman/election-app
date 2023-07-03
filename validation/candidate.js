//importing prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//validating candidate
const checkCandidateExists = async (req, res, next) => {
  const candidateName = req.body.candidateName;
  const candidate = await prisma.candidates.findFirst({
    where: {
      candidateName,
    
    },
  });

  if (candidate) {
    return res.status(422).json({
      message: "Candidate already exists",
    });
  } else {
    next();
  }
};
//exporting the function
module.exports = {
  checkCandidateExists,
};
