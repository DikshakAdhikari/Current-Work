import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import { mongooseConnect } from './connection/connect'; 
import UserRouter from './routes/userRoute';
import cors from 'cors'
import OtpRouter from './routes/emailVerification';
mongooseConnect(); 

const app = express();
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use("/otp", OtpRouter )
app.use("/user", UserRouter)
app.get('/', (req,res)=> {
  res.json("Hello there!")
})


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
