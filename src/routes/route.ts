import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controller/productController";

const routeHandler = (req:IncomingMessage, res:ServerResponse) =>{

    const url = req.url
    const method = req.method
   if(url === "/" && method === "GET"){
    // console.log("this is home page")
    res.writeHead(200,{"content-type":"application/json"})
    res.end(JSON.stringify({message:"this is home page"}))
   }else if(url?.startsWith("/products")){
    productController(req,res)
   }
   else{
    // console.log('page not found')
    res.writeHead(200,{"content-type":"application/json"})
    res.end(JSON.stringify({message:"page not found"}))
   }
}


export default routeHandler;