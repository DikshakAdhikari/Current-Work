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
        socket.userId= payload.id
        next()
    })
})

global.onlineUsers= new Map()

let users= []
io.on('connection', async (socket)=> {
    console.log('connected');
    socket.emit("message", socket.id)
    global.chatSocket = socket;
    socket.on('add-user', async(userId)=> {
        // console.log(userId);
        global.onlineUsers.set(userId, socket.id)
        users.push({
            userId:socket.userId,
            socketId: socket.id
        }); 
        socket.emit("get-status", users)
    });

   
    socket.on('disconnect', ()=> {
        const filteredUsers= users.filter((val)=> val.socketId !== socket.id);
        socket.emit("get-status", filteredUsers)
        console.log('Socket connection closed');
    })

   
  socket.on('send-chat', ({text, contactUserId})=> {
    const sendUserSocketId = global.onlineUsers.get(contactUserId);
    if(sendUserSocketId){
        socket.to(sendUserSocketId).emit("recieve-chat",text);
    }  
  })
});

