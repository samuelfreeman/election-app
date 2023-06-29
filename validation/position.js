
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const checkpositionExists = async(req,res,next)=>{
    const positionName = req.body.positionName;
const position = await prisma.positions.findUnique({
    where: {
        positionName,
      }
})

if (position) {
     return res.status(422).json(
        { 
            message: "Position already exists"
        }
        );
    }
else {
next()
}

};
module.exports  ={
    checkpositionExists
    
} 