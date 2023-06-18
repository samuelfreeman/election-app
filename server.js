const express = require('express');
const appRoutes = require('./routes/index')
const app = express();
const PORT =process.env.PORT || 8080;

app.use('/api',appRoutes)


app.get('/',(req,res,next)=>{
res.status(200).json({
 "message":"welcome to our  voting app"
})
}
)
app.listen(PORT,()=>{
   console.log(`server running on port${PORT}`)
});


