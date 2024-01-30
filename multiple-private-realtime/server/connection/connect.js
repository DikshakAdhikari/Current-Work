const mongoose= require('mongoose')

const connect= async()=> {
    try{
        const c= await mongoose.connect('mongodb://localhost:27017/chat')
         console.log("MongoDb connected successfully!");
    }catch(err){
        console.log(err);
    }
}

module.exports= connect;