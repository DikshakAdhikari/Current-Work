import express from 'express'
import userModel from '../models/userModel.js';

export const insertUserController = async (req,res)=> {
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
}