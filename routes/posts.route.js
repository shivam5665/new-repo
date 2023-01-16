const express = require("express");
const jwt = require("jsonwebtoken")
const mongoose = ("mongoose");
const bcrypt = require("bcrypt")
const {postsModel} = require("../model/posts.model");

const postsRouter = express.Router();

postsRouter.get("/:id",async(req,res)=>{
    const ID = req.params.id
    const post = await postsModel.find({"_id":ID})
    const userID = post.userID;
    const userID_mak = req.body.userID
    const token = req.headers.authorization;
    try{
        if(userID_mak !== userID){
            res.send("You are not Authorized")
        }else{
            // jwt.verify(token,"masai",async(err,decoded)=>{
            //     if(err){
            //         res.send("ERR",err)
            //     }else{
            //         await postsModel.find({decoded})
            //         res.send()
            //     }
            // })
            const posts = await postsModel.findOneAndUpdate({"_id":ID});
             res.send(posts)
        }
    }catch(err){
        console.log(err);
        res.send("somthing went wrong")
    }
    
})
postsRouter.post('/create',async(req,res)=>{
    const {title,body,device} = req.body;
    try{
        const post = new postsModel({title,body,device}) ;
        await post.save();
        res.send("Post create Successfully")
    }catch(err){
        console.log(err);
        res.send("Something went wrong")
    }
})
postsRouter.patch('/update/:id',async(req,res)=>{
    const Id = req.params.id
    const {title,body,device} = req.body;
    const post = await postsModel.find({"_id":Id})
    const userID = post.userID;
    const userID_mak = req.body.userID
    try{
        if(userID_mak !== userID){
            res.send("You are not Authorized")
        }else{
            await postsModel.findOneAndUpdate({"_id":Id},{title,body,device});
             res.send("Post Updated Successfully")
        }
        
    }catch(err){
        console.log(err);
        res.send("Something went wrong")
    }
})

postsRouter.delete('/delete/:id',async(req,res)=>{
    const Id = req.params.id
    const {title,body,device} = req.body;
    const post = await postsModel.find({"_id":Id})
    const userID = post.userID;
    const userID_mak = req.body.userID
    try{
        if(userID_mak !== userID){
            res.send("You are not Authorized")
        }else{
            await postsModel.findOneAndDelete({"_id":Id});
             res.send("Post Delete Successfully")
        }
        
    }catch(err){
        console.log(err);
        res.send("Something went wrong")
    }
})


module.exports = {postsRouter}