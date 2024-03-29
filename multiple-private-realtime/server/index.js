const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server ,{
  cors:{
     origin:"http://localhost:3001",
     credentials:true,
  }
});


io.on("connect", (socket)=> {
  // console.log(socket.id);
  socket.emit("message", socket.id)
  socket.on("chat", ({text, room})=> {
    // console.log(text);
    io.to(room).emit("user:chat", {text,room}) 

  } )
   socket.on("join", (room)=> {
     socket.join(room)
    // console.log(room);
   })
})

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});