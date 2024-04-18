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
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use("/user", UserRouter)
app.use("/otp", OtpRouter )
app.get('/', (req,res)=> {
  res.json("Hello there!")
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
