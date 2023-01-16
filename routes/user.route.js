const express = require("express");
const jwt = require("jsonwebtoken")
const mongoose = ("mongoose");
const bcrypt = require("bcrypt")
const {userModel} = require("../model/user.model");
const { postsModel } = require("../model/posts.model");

const userRouter = express.Router();




userRouter.post("/register",async(req,res)=>{
    const {email,name,gender,password}  = req.body;
    
    
        try{
            const user = await userModel.find({email})
            if(user.length==0){
                bcrypt.hash(password, 5, async(err, hash)=>{
                    if(err){
                     console.log(err)
                    }else{
                     console.log(hash);
                     const new_user = new userModel({email,name,gender,password:hash}) 
                     await new_user.save();
                     console.log(new_user)
                     res.send("Registered Successfully")
                    }
                 })
            }else{
                res.send("Already a user")
            }
            
        }catch(err){
            console.log(err);
            res.send("Something went wrong")
        }
   
    
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
     try{
        const user = await userModel.find({email})
        if(!user.length){
            res.send("No User Found! Register first")
        }else{
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token = jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"Login Successfully","token":token})
                }
            })
        }
        }catch(err){
            console.log(err);
            res.send("Wrong Credentials")
        }
    
})

module.exports = {
    userRouter
}