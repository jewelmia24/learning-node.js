import { createServer, IncomingMessage, ServerResponse } from "http";

const server = createServer((req:IncomingMessage, res:ServerResponse)=>{
   
    const url = req.url
    const method = req.method
   if(url === "/" && method === "GET"){
    // console.log("this is home page")
    res.writeHead(200,{"content-type":"application/json"})
    res.end(JSON.stringify({message:"this is home page"}))
   }else if(url?.startsWith("/products")){
    res.writeHead(200,{"content-type":"application/json"})
    res.end(JSON.stringify({message:"this is products page"}))
   }
   else{
    // console.log('page not found')
    res.writeHead(200,{"content-type":"application/json"})
    res.end(JSON.stringify({message:"page not found"}))
   }
})

server.listen(5000,()=>{
    console.log("Server is running and she never tired but sometime she is dead")
})