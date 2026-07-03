const express=require("express")
const router=express.Router()
const {handlePostSignIn,handlePostLogin}=require("../controller/user")

router.post("/",handlePostSignIn)
router.post("/login",handlePostLogin)
module.exports=router