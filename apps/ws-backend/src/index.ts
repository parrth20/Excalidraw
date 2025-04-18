import ws, { WebSocketServer } from 'ws'
import jwt from 'jsonwebtoken'

const wss = new WebSocketServer({port:3002});

wss.on("connection",(socket, request)=>{
    const url = request.url;
    if(!url){
        return;
    }
    const urlSearchParams = new URLSearchParams(url.split("?")[1]);
    const token = urlSearchParams.get("token") ;
    if(!token)return;
    const decode = jwt.verify(token,"key");

    socket.on("message",(data)=>{
        console.log(data)
    })
})