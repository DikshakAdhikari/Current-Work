const express= require('express');
const CHAT = require('../models/chat');
const chatRouter= express.Router()


chatRouter.post('/getChats', async(req,res)=> {
    try{
        const {from, to}= req.body;
        const data= await CHAT.find({
            users:{
            $all:[from, to]
            }
        }).sort({ updatedAt: 1 });
        
        let chats= []
        data.map((val)=> {
            const obj={};
            // console.log('senderrrr', val.sender.toString());
            obj.chat= val.chat.text;
            if(val.sender.toString() === from){
                obj.userSend=true;
            }else{
                obj.userSend=false;
            }  
            chats.push(obj);  
        });
        console.log(chats);

        res.json(chats)
    }catch(err){
        res.json({message:err})
    }
});

chatRouter.post('/' , async(req,res)=> {
    //post 
    const {from, to, message} = req.body;
     console.log(global.onlineUsers);
    try{
        const postChat= await CHAT.create({
            chat: {
                text:message
            },
            users: [from, to],
            sender:from
        });
        await postChat.save()
        res.json({message:'Chat saved successfully!'})
    }catch(err){
        res.json(err)
    }
});

module.exports= chatRouter