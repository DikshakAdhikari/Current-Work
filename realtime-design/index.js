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
client.on('connect', () => {
    console.log('Connected to Redis');
});
client.on('error', err => console.log('Redis Client Error', err));


function sendMessage(socket) {
    client.lrange("messages", "0", "-1", (err, data) => {
        data.map(x => {
            const usernameMessage = x.split(":");
            const redisUsername = usernameMessage[0];
            const redisMessage = usernameMessage[1];

            socket.emit("message", {
                from: redisUsername,
                message: redisMessage
            });
        });
    });
}
io.on("connection", socket => {
    sendMessage(socket);

    socket.on("message", ({ message, from }) => {
        client.rPush("messages", `${from}:${message}`);

        io.emit("message", { from, message });
    });
});

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

