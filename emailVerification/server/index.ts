import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
dotenv.config()
import { mongooseConnect } from './connection/connect'; 
import UserRouter from './routes/userRoute';
import cors from 'cors'
import OtpRouter from './routes/emailVerification';
mongooseConnect(); 

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(bodyParser.json());
app.use("/user", UserRouter)
app.use("/otp", OtpRouter )



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
