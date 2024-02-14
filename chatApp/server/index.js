const express = require('express')
const {createServer} = require("http");
const { Server } = require('socket.io');
const userRouter = require('./routes/user');
const connectDb = require('./connection/connect');
const cors= require('cors')

const PORT= 3000;
const app = express();
app.use(express.json())
const server= createServer(app)
app.use(cors({
    origin:"http://localhost:3001"
}))
connectDb()
app.use('/user', userRouter)


app.get('/', (req,res)=> {
    res.send('All set!')
})



app.listen(PORT , ()=> {
    console.log('Server listening on port '+ PORT);
});

const io= new Server(server, {
    cors:{
        origin:"http://localhost:3001"
    }
})


global.onlineUsers= new Map()

io.on('connection', (socket)=> {
    console.log(socket);
    socket.on('add-user', (userId)=> {
        onlineUsers.set(userId, socket.id)
    });
})
