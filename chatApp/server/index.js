const express = require('express')
const {createServer} = require("http");
const { Server } = require('socket.io');
const PORT= 3000;
const app= express()
app.use(express())
const server= createServer(app)

const io= new Server(server)

app.get('/', (req,res)=> {
    res.send('All set!')
})

io.on('connection', (socket)=> {
    console.log(socket);
    socket.emit("message", 'socket connected')
})

app.listen(PORT , ()=> {
    console.log('Server listening on port '+ PORT);
});