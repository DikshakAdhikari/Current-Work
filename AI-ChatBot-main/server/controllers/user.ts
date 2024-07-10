import jwt, { Secret } from 'jsonwebtoken';
import User from "../models/user";
import bcrypt from 'bcrypt';

import dotenv from 'dotenv'
dotenv.config();

//@ts-ignore
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    console.log(newUser);
    
    res.status(201).json(newUser);
  } catch (error) {
    //@ts-ignore
    res.status(400).json({ message: error.message });
  }
};
//@ts-ignore
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    if (!process.env.SECRET) {
      throw new Error('JWT secret is not defined');
    }
    // Generate a JWT
    const token = jwt.sign({ id: user._id },process.env.SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ });
  }
};
