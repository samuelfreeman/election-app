
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const checkVoteExists = async(req,res,next)=>{
    const voterId = req.body.voterId;
const voter = await prisma.voters.findUnique({
    where: {
        voterId,
      }
})

if (voter) {
     return res.status(422).json(
        { 
            message: "voter already exists"
        }
        );
    }
else {
next()
}

};
module.exports  ={
    checkVoteExists
    
} 