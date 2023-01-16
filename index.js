const express = require("express")
const {connection} = require("./config/db")
const {userRouter} = require("./routes/user.route")
const {postsRouter} = require("./routes/posts.route")
const app = express();
const {authenticate} = require("./middleware/authencate.middleware")
app.use(express.json());


app.get("/",(req,res)=>{
    res.send(`<h1> HOME </h>`)
})
app.use("/user",userRouter)

app.use(authenticate)

app.use("/posts",postsRouter)
app.listen(process.env.port,async()=>{
    try{
        console.log("running at 8900")
    }catch(err){
        console.log(err)
    }
})




