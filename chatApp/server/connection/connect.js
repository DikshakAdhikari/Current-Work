const mongoose= require('mongoose')

const connectDb= ()=> {
    mongoose.connect('mongodb://localhost:27017/chatting').then(()=> console.log('Mongodb connected')).catch((err)=> console.log(err))
}

module.exports= connectDb
