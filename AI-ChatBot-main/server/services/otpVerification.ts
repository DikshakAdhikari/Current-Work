import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()


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

  import bcrypt from 'bcrypt';  
import otpVerification from '../src/models/otpVerification'



//@ts-ignore
export const sendOtpVerificationEmail = async({_id, email}, res)=> {
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
  