const express=  require('express')
const { v4: uuidv4 } = require('uuid');
const jwt= require('jsonwebtoken');
const io = require('../index');
const USER = require('../models/user');
const CHAT = require('../models/chat');
const verifyToken = require('../services/auth');
let user= []
const userRouter = express.Router()
const secret= 'secret'
userRouter.post('/',async(req,res)=> {
    try{
        const {username, email, password}= req.body;
  
        const user= await USER.findOne({username, email});
    
        if(user){
            return res.json.status(400).json('user already registered')
        }
        const newUser= await USER.create({username, email, password, online:false});
        await newUser.save()
        delete newUser.password
        // const token = jwt.sign({username, email}, "secret")
        // console.log(token);
        res.json("User signed up successfully!")

    }catch(err){
        res.status(403).json(err)
    }
})

userRouter.post('/signin',async(req,res)=> {
    try{
        const { email, password}= req.body;
        const user= await USER.findOne({email});
        if(!user){
            return res.status(403).json("User not registered!")
        }
        const token= jwt.sign({id:user._id, username:user.username, email:user.email}, "secret" ) 
        res.json({token, userId:user._id, username:user.username})

    }catch(err){
        res.status(403).json(err)
    }
})


// userRouter.get('/all/:userId', verifyToken, async(req,res)=> {
//     try{
//         const senders= await USER.find({ _id: { $ne: req.params.userId } }).select([
//             "email", "username","_id"
//         ]);
//         // console.log('posttttt', global.online);
//         let chatArray= []
//         const chats = await Promise.all(senders.map(async (val) => {
//             const senderId = val._id.toString();
//             // const username= val.username
//             // const email= val.email
//             const senderToUserChatsCount = await CHAT.find({ users: [senderId, req.params.userId] }).count();
//             chatArray.push({val , senderToUserChatsCount})
//         }));
//         // console.log(chatArray);
//         res.json(chatArray)
//     }catch(err){
//         res.json(err)
//     }
// });

userRouter.get('/all/:userId', verifyToken, async(req,res)=> {
    try{
        const senders= await USER.find({ _id: { $ne: req.params.userId } }).select([
            "email", "username","_id"
        ]);
        // console.log('posttttt', global.online);
        let chatArray= []
        const chats = await Promise.all(senders.map(async (val) => {
            const senderId = val._id.toString();
            // const username= val.username
            // const email= val.email
            const senderToUserChatsCount = await CHAT.find({ $and : [ {users: [senderId, req.params.userId]} , {seen:false} ]}).count();
            // chatArray.push({val , senderToUserChatsCount})
            chatArray.push({val , unseenChats:0, read:false})
        }));
        // console.log(chatArray);
        res.json(chatArray)
    }catch(err){
        res.json(err)
    }
});


module.exports= userRouter
