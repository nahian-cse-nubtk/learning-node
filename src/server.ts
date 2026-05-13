import { createServer, IncomingMessage, ServerResponse, type Server } from "http";
import { routeHandler } from "./routes/routes";
import config from "./config";

const server:Server = createServer((req:IncomingMessage,res:ServerResponse)=>{

    routeHandler(req,res);
    //res.end('The Server is running properly')
})


server.listen(config.port,()=>{
    console.log(`Server is running at port ${config.port}`)
})