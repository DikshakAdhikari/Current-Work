const express = require('express')
const {createServer} = require("http");
const socket = require('socket.io');
const userRouter = require('./routes/user');
const connectDb = require('./connection/connect');
const cors= require('cors');
const chatRouter = require('./routes/chat');

const PORT= 5000;
const app = express();
app.use(express.json())
const server= createServer(app)
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
connectDb()
app.use('/user', userRouter)
app.use('/chat', chatRouter )

app.get('/', (req,res)=> {
    res.send('All set!')
})

 const serverr= app.listen(PORT , ()=> {
    console.log('Server listening on port '+ PORT); 
});


const io= socket(serverr, {
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    
    }
})

global.onlineUsers= new Map()

io.on('connection', (socket)=> {
    socket.emit("message", socket.id)
    global.chatSocket = socket;
    socket.on('add-user', (userId)=> {
        onlineUsers.set(userId, socket.id)
    });
  socket.on('send-chat', ({text, contactUserId})=> {
    const sendUserSocketId = global.onlineUsers.get(contactUserId);
    console.log(global.onlineUsers);
    if(sendUserSocketId){
        socket.to(sendUserSocketId).emit(text);
    }  
  })
})

