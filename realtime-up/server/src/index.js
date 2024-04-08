import {createServer} from "http"
import { Server} from "socket.io"

const httpsServer= createServer()
const io= new Server(httpsServer, {
    cors:{
        origin: "http://localhost:5173",
        methods:["GET","POST"]
    },
});

io.on("connection", async (socket)=> {

})

console.log("Listening to port....");
httpsServer.listen(4000)
