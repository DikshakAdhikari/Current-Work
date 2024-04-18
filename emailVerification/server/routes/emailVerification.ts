import express, { Request, Response } from 'express'
import otpVerification from '../models/otpVerification';
import { User } from '../models/user';
import bcrypt from 'bcrypt';

const OtpRouter = express.Router()


OtpRouter.post('/verifyOtp', async (req: Request,res: Response)=> {
    try{
      let { userId, otp} = req.body;
      console.log(userId, otp);
      
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

  export default OtpRouter