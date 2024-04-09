import express from 'express'
// import { insertUserController } from '../controllers/userController.js'
import userModel from '../models/userModel.js'
const userRouter= express.Router()

userRouter.post('/', async (req,res)=> {
    try{
        const {name, username, email, password}= req.body;
        const insertt= await userModel.create({
            name, username, email, password
        })
        await insertt.save()
        const user= await userModel.findOne({email})
        res.status(200).json({userId:user._id})
    }catch(err){
    }
})


export default userRouter

