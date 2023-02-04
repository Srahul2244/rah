const jwt =require('jsonwebtoken')
require('dotenv').config()

const validator =(req,res,next)=>{
    const token =req.headers.authorization
    if(token){
        const decoded=jwt.verify(token,process.env.secret)
        
        if(decoded){
            // console.log(decoded)
            const userId=decoded.userId;
            req.body.userId=userId;
            next()
        }else{
            res.send({"msg":"please login first"})
        }
    }else{
        res.send("please login first")
    }
}

module.exports={validator}