import express, { Request, Response } from 'express'
import { User, UserInterface } from '../models/user';
import bcrypt from 'bcrypt';
import { sendOtpVerificationEmail } from '../services/otpVerification';

const UserRouter= express.Router();

UserRouter.post('/signup', async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        if(existingUser.emailVerified === true){
          return res.status(400).json({ message: 'Email already exists' });
        }else{
          console.log("exx",existingUser);
          const userToDelete = await User.deleteMany({ email });
        }     
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
      //@ts-ignore
      await sendOtpVerificationEmail(newUser , res)
  
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  UserRouter.post('/signin', async (req: Request, res: Response) => {
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
  


export default UserRouter