import { putObject } from  '../aws-service/aws-client.js'
import profileModel from '../models/profileModel.js';

export const uploadedImagePath= async (req,res)=> {
    try{
        const {filename, contentType}= req.body;
        const url= await putObject(`image-${filename}`, contentType);
        res.json(url)   
        
    }catch(err){
        res.status(403).json({message:err})
    }
} 


export const createProfile= async (req,res)=> {
    try{
        const {filename, location, userId}= req.body;

        const profile=  await profileModel.create({
            image:`https://s3.ap-south-1.amazonaws.com/${process.env.BUCKET_NAME}/uploads/profile-pic/image-${filename}`,
            location, userId
        })
        await profile.save()
        res.json("Profile saved Successfully!")
    }catch(err){
        res.status(403).json({message:err})
    }
}

export const getUserProfileDetails = async (req,res)=> {
    try{
        const userId= req.params.userId; //parser

        const userProfile= await profileModel.findOne({
            userId
        }).populate("userId")
        res.json(userProfile)
    }catch(err){
        res.status(403).json({message:err})
    }
}