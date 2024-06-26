const express = require('express')
const dotenv= require('dotenv')
const connectDB= require('./connection/connect.js')
const userRouter= require('./routes/user.js')
require('./processors/index.js')
dotenv.config()
// require("./processors/index.js")
connectDB()
const app= express()
app.use(express.json())

app.use('/user', userRouter)


app.get('/:id',  async (req,res)=> {
     try{
          const response= await req.query
           console.log(response);
     }catch(err){
        console.log(err);
        res.json({message:"error whilee pushing"+err})
     }
})
app.listen(process.env.PORT || 5000, ()=> {
    console.log(`Server listening on port ${process.env.PORT}`);
})
