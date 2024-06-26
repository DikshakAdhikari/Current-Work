const mongoose= require('mongoose')

const ChatSchema= new mongoose.Schema({
    chat:{
        text:{
            type:String,
            required:true
        },
    },
    users:Array,
    sender:{
     type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    seen: {
        type:Boolean,
        default:false,
        required:true
    }
},{timestamps:true});

const CHAT= new mongoose.model('chat', ChatSchema)
// const CHAT= new mongoose.model('chat', ChatSchema)
module.exports= CHAT