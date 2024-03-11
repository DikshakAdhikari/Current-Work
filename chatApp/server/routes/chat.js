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
            obj._id= val._id
            if(val.sender.toString() === from){
                obj.userSend=true;
            }else{
                obj.userSend=false;
            }  
            chats.push(obj);  
        });

        // await Promise.all(data.map(async(val)=> {
        //     if(val.sender.toString() !== from){
        //         await CHAT.findOneAndUpdate({_id:val._id},{seen:true})
        //     }
        // }))

        res.json(chats)
    }catch(err){
        res.json({message:err})
    }
});

chatRouter.post('/unseen', async(req,res)=> {
    try{
        const seenChatCount = await CHAT.countDocuments({
            $expr: { $gt: [{ $size: "$timestamp" }, 0] }
        });
        
        console.log('seen count',seenChatCount);
        const totalChatsCount = await CHAT.find().countDocuments();
        console.log('total', totalChatsCount);
        const unseenMessages= totalChatsCount - seenChatCount;
        console.log('unseenCount',unseenMessages);
        res.json(unseenMessages)

        
    }catch(err){
        res.json(err)
    }
})


chatRouter.post('/' , async(req,res)=> {
    //post 
    const {from, to, message} = req.body;
    try{
        const postChat= await CHAT.create({
            chat: {
                text:message
            },
            users: [from, to],
            sender:from,
            seen:false
        });
        await postChat.save()
        res.json({message:'Chat saved successfully!'})
    }catch(err){
        res.json(err)
    }
});

chatRouter.put('/seen/:userId', async(req,res)=> {
    try{
        const chatting= await CHAT.findOneAndUpdate({sender:req.params.userId},{seen:true});
        console.log(chatting);

    }catch(err){
        res.json(err);
    }
});

chatRouter.get('/:chatId', async (req,res)=> {
    try{
        console.log(req.params.chatId);
        const updateSeen= await CHAT.findOneAndUpdate({_id:req.params.chatId}, {seen:true} );
        console.log(updateSeen);
        res.json("seen updated")
    }catch(err){
        console.log(err);
    }
})

module.exports= chatRouter