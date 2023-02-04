const express= require('express')
const cartRouter =express.Router()
const {cartModel} =require("../models/cart.model")

cartRouter.post("/",async(req,res)=>{
    const data =req.body;
   //  console.log(data)
    try{
      const isData =await cartModel.findOne({$and:[{userId:data.userId},{refId:data.refId}]})
      // console.log(isData)
      if(isData){
         isData.quantity =isData.quantity+data.quantity;
          const Data =await cartModel.findByIdAndUpdate({_id:isData._id},isData)
          res.send({"msg":"Data Added to Cart"})
      }else{
         const Data = new  cartModel(data)
         await Data.save()
         res.send({"msg":"Data  Added to Cart"})
      }
      }
     catch(err){
        console.log(err)
     res.send({"msg":"soething went wrong"})
     
    }
})
cartRouter.get("/",async(req,res)=>{
    
    try{
       const data = await  cartModel.find()
       res.send({data:data})
       
    }catch(err){
        console.log(err)
     res.send({"msg":"soething went wrong"})
     
    }
})


cartRouter.delete("/:id",async(req,res)=>{
   const _id =req.params.id;
       try{
       const data =  await cartModel.findByIdAndDelete({"_id":_id})
         return res.send({"msg":"Data gets deleted"})
       }catch(err){
         res.send("err")
         console.log({"err":"something went wrong"})
       }
     })

module.exports ={cartRouter}