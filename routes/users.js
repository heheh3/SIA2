import express from "express";
import {} from "../controller/post.js"

const router = express.Router()

router.get("", (req,res)=>{
    res.send("it works!")
})



export default router 