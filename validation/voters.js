
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const checkUserExists = async(req,res,next)=>{
    const studentId = req.body.studentId;
const voter = await prisma.voters.findUnique({
    where: {
        studentId,
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
    checkUserExists
    
} 