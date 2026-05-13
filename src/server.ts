import { createServer, IncomingMessage, ServerResponse, type Server } from "http";
import { routeHandler } from "./routes/routes";

const server:Server = createServer((req:IncomingMessage,res:ServerResponse)=>{

    routeHandler(req,res);
    //res.end('The Server is running properly')
})





const PORT=5000;
server.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})