//importing the prisma dependency 
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//authenticating voter email
const checkEmailExists = async (req, res, next) => {
  const email = req.body.email;
  const voters = await prisma.voters.findFirst({
    where: {
      email,
    },
  });

  if (!voters) {
    return res.status(422).json({
      message: "Please sign up!",
    });
  } else {
    next();
  }
};
//authenticating user email
const userEmail = async(req,res,next)=>{
  const email = req.body.email;
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(422).json({
      message: "Please sign up!",
    });
  } else {
    next();
  }
}
module.exports = {
  checkEmailExists,
  userEmail
};