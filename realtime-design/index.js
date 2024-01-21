const express= require('express');
const {Server}= require('socket.io')
const app = express()
const http = require("http");
const { createClient } = require('redis');
app.use(express.json())

app.set("view engine", "ejs")

const server= http.createServer(app)
const io= new Server(server)
const client= createClient()




io.on("connection", socket => {
    socket.on("message", ({message, from})=> {
        io.emit("message", {message,from}) // here we have written io instead of socket.emit because io is responsible to send the message to all the users connected to our server. If we would have used just the socket then it would send message to the user who have made the message
    } )
})

app.get('/chat', async(req,res)=> {
    const username= req.query.username
    io.emit("joined", username)
    res.render("chat",{username})

})

app.get('/', async (req, res)=> {
    res.render("index")
})

server.listen(5000 , ()=> {
    console.log(`Server listening on port 5000`);
})

