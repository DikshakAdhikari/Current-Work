const express= require('express');
const {Server}= require('socket.io')
const app = express()
const http = require("http")
app.use(express.json())

app.set("view engine", "ejs")

const server= http.createServer(app)
const io= new Server(server)

io.on('connection', (message) => {

} )

app.get('/chat', async(req,res)=> {
    res.render("chat")
})

app.get('/', async (req, res)=> {
    res.render("index")
})

server.listen(5000 , ()=> {
    console.log(`Server listening on port 5000`);
})

