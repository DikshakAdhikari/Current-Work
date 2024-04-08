import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { mongooseConnect } from './connection/connect.js'
import userRouter from './routes/userRouter.js'
import profileRouter from './routes/profileRouter.js'
import { Resend } from "resend";
dotenv.config()

const app= express()
mongooseConnect()
app.use(cors({
  origin: "http://localhost:3000"
}))

app.use(express.json())
const resend = new Resend("re_cR3K4MjP_xGbAHxxyjdVghS9fmawj3K3W");

app.use('/user', userRouter)
app.use('/profile', profileRouter)

app.get("/", async (req, res) => {
  const emailId= req.params.id
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["sejal8974@gmail.com"],
    subject: "hello world",
    text:'hello'
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});


app.listen(process.env.PORT , ()=> console.log(`Server listening on port ${process.env.PORT}`))
