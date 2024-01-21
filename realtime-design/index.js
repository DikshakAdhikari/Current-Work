const express= require('express');
const {Server}= require('socket.io')
const app = express()
const http = require("http");
app.use(express.json())

app.set("view engine", "ejs")

const server= http.createServer(app)
const io= new Server(server)
const redis = require("redis");
const client = redis.createClient();
client.on('error', err => console.log('Redis Client Error', err));

client.connect()

const getChat = (socket)=> {
    console.log('dfdfdfdfdfd');
   client.lRange("messages", "0" , "-1" , (err,data) => {
        console.log('hhhhhhh');
        data.map(val => {
            const userNameMessage= val.split(":");
            const redisUsername= userNameMessage[0];
            const redisMesage= userNameMessage[1];
            console.log(redisUsername,redisMesage);
            
            socket.emit("message" ,{
                from: redisUsername,
                message: redisMesage
            })
        })
    } )
}

io.on("connection", socket => {
    getChat(socket)
    socket.on("message", async({message, from})=> {
        client.rPush("messages", `${from}:${message}`) // key= message, value= "from:message"
        io.emit("message", {message,from}) // here we have written io instead of socket.emit because io is responsible to send the message to all the users connected to our server. If we would have used just the socket then it would send message to the user who have made the message
    } )
})

app.get('/chat', async(req,res)=> {
    getChat()
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

