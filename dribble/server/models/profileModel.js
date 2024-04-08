import mongoose, { Schema } from "mongoose";

const profileSchema= new mongoose.Schema({
    image: {
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:'userClient',
        required:true 
    }
});

const profileModel= mongoose.model('profileUser', profileSchema);
export default profileModel