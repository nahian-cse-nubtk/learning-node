import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routeHandler =(req:IncomingMessage,res:ServerResponse)=>{
        //console.log(req.method);
    const url = req.url;
    const method = req.method;

    if(url==='/' && method ==="GET"){

        res.writeHead(200,{"content-type":"application/json"})

        res.end(JSON.stringify({message:"The server is running and this is root"}))
    }
    else if(url?.startsWith("/products")){
      productController(req,res);

    }
    else{
        res.writeHead(404,{"content-type":"application/json"})
        res.end(JSON.stringify({message:"Route not found"}))
    }

}