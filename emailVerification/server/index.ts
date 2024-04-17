
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import { User, UserInterface } from './models/user';
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
 dotenv.config()
import { mongooseConnect } from './connection/connect'; 
import otpVerification from './models/otpVerification';
mongooseConnect(); 

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173'
}));

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
        //@ts-ignore
        address:process.env.EMAIL
      },  
      to: `${emailId}`, 
      subject: "Hello ", 
      text: "Thank you", 
      // html: "<b>Thank you</b>", 
    });
  //@ts-ignore
    res.json(info.messageId)
  }catch(err){
    res.status(403).json({message:err})
  }
 
})

app.post('/signup', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10); 

    
    const newUser: UserInterface = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, 
      emailVerified:false
    });

    await newUser.save();
    console.log(newUser);
    
    //@ts-ignore
    await sendOtpVerificationEmail(newUser , res)

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Signin successful' });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/verifyOtp', async (req,res)=> {
  try{
    let { userId, otp} = req.body;
    if(!userId || !otp){
       throw Error("Empty otp details are not allowed");
    }else{
      const UserOtpVerificationList= await otpVerification.find({userId});
      if(UserOtpVerificationList.length <= 0 ){
        throw Error("Account is does not exists or verified already. Please login or signup")
      }else{
        const { expiresAt} = UserOtpVerificationList[0];
        const hashedOtp= UserOtpVerificationList[0].otp;
        //@ts-ignore
        if(expiresAt < Date.now()){
          // user otp record has expired
          await otpVerification.deleteMany({userId})
          throw new Error("Code has expired please request again!")
        }else{
            //@ts-ignore
          const validOtp= await bcrypt.compare(otp, hashedOtp)
          if(!validOtp){
          
            throw new Error("Invalid code passed. Please check your inbox again!")
          }else{
            await User.updateOne({_id:userId}, {emailVerified:true})
            await otpVerification.deleteMany({userId})

            res.json({
              status:"VERIFIED",
              message:"User email verified successfully!"
            })
          }
        }
      }
    }
  }catch(err){
    res.json({
      status:"FAILED",
      message: err
    })
  }
})

//@ts-ignore
const sendOtpVerificationEmail = async({_id, email}, res)=> {
  try{
    const otp= `${Math.floor(1000 + Math.random() * 9000)}`;

    //mail options
    const mailOptions= {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email addresss and complete the signup</p><p>This otp <b>expires in 1 hour</b>.</p>`
    }

    //hash the otp
    const saltRounds= 10;
    const hashedOtp= await bcrypt.hash(otp, saltRounds)
   const newOtpVerification= await new  otpVerification({
      userId:_id,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiredAt: Date.now() + 3600000,
    });

    await newOtpVerification.save();
    transporter.sendMail(mailOptions);
    res.json({
      status: "PENDING",
      message: "Verification otp email sent",
      data:{
        userId: _id,
        email,
      }
    })

  }catch(err){
    res.json({
      status:"FAILED",
      message: err
    })
  }
}




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
