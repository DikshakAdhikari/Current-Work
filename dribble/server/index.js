import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { mongooseConnect } from './connection/connect.js'
import userRouter from './routes/userRouter.js'
import profileRouter from './routes/profileRouter.js'
import nodemailer from "nodemailer"
dotenv.config()
const app= express()
mongooseConnect()


app.use(cors({
  origin: "http://localhost:3000"
}))

app.use(express.json())
app.use('/user', userRouter)
app.use('/profile', profileRouter)

app.get('/', async(req,res)=> {
  res.json("hello everyone!!")
})


const transporter = nodemailer.createTransport({
  service:'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.get('/:id', async(req,res)=> {
  const emailId= req.params.id
  try{
    const info = await transporter.sendMail({
      from: {
        name: 'Test',
        address:process.env.EMAIL
      },  
      to: `${emailId}`, 
      subject: "Hello ", 
      text: "Thank you", 
      // html: "<b>Thank you</b>", 
    });
  
    res.json(info.messageId)
  }catch(err){
    res.status(403).json({message:err})
  }
 
})

app.listen(process.env.PORT , ()=> console.log(`Server listening on port ${process.env.PORT}`))
