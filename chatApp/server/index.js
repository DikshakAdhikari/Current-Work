const express = require('express')
const {createServer} = require("http");
const socket = require('socket.io');
const userRouter = require('./routes/user');
const connectDb = require('./connection/connect');
const cors= require('cors');
const chatRouter = require('./routes/chat');
const jwt= require("jsonwebtoken")

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

io.use((socket, next)=> {
    const token=  socket.handshake.auth.token;
    if(!token){
        return next(new Error("Authentication error"));
    }
    jwt.verify(token, "secret", (err, payload)=> {
        if(err){
            return next(new Error("Authentication error"));
        }
        socket.username= payload.username;
        next()
    })
})

global.onlineUsers= new Map()

const users= []
io.on('connection', async (socket)=> {
    console.log('connected');
    socket.emit("message", socket.id)
    global.chatSocket = socket;
    socket.on('add-user', async(userId)=> {
        // console.log(userId);
        global.onlineUsers.set(userId, socket.id)
        users.push(userId)
        
    });
    io.emit('onlines', users)
    socket.on('disconnect', ()=> {
    
        onlineUsers.delete(socket.id);
        for (let [key, value] of onlineUsers) {
            users.push(value)
        }
        
        console.log('Socket connection closed');
    })

   
  socket.on('send-chat', ({text, contactUserId})=> {
    const sendUserSocketId = global.onlineUsers.get(contactUserId);
    if(sendUserSocketId){
        socket.to(sendUserSocketId).emit("recieve-chat",text);
    }  
  })
});

