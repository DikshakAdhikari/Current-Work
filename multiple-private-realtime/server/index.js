const express= require('express');
const connect = require('./connection/connect');
const createServer= require("http").createServer
const {Server}= require('socket.io')
const port= 4000

const app= express();
const server= createServer(app)

const io= new Server(server)


connect()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
  });



app.listen(port , ()=> {
    console.log(`Server listening on port ${port}`);
})


 io.on('connection' , (socket)=> {
    console.log('a user connected!');
 })