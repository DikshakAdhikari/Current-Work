import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

var uri = "mongodb://localhost:27017/2fa_node";

export const connectMongoose = async () => {
    if(typeof process.env.MONGO_URI === "string"){
        mongoose.connect(process.env.MONGO_URI).then(()=> console.log('DB connected successfully')).catch((err)=> console.log(err))
        }
}
