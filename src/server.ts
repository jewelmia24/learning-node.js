import { createServer } from "http";

const server = createServer((req, res)=>{
    console.log(req)
})

server.listen(5000,()=>{
    console.log("Server is running and she never tired but sometime she is dead")
})