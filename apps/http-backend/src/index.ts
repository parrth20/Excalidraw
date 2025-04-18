import express from 'express'

const app = express();

app.post("/api/v1/signin",(req, res)=>{
    const {username, password} = req.body;
    // const response = await username.
    // const token = await 
})

app.post("/api/v1/signup", (req,res)=>{
    const {usernmae, password} = req.body;

})

app.post("/api/v1/create-room", (req,res)=>{

})

app.listen(3001,()=>{
    console.log("hello world\n");
})