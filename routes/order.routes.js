const express= require('express')
const orderRouter =express.Router()
const {orderModel} =require("../models/order.model")








orderRouter.post("/",async(req,res)=>{
    const data =req.body;
   //  console.log(data)
    try{
      const isData =await orderModel.findOne({$and:[{userId:data.userId},{refId:data.refId}]})
      // console.log(isData)
      if(isData){
         isData.quantity =isData.quantity+data.quantity;
          const Data =await orderModel.findByIdAndUpdate({_id:isData._id},isData)
          res.send({"msg":"Ordered Successfully"})
      }else{
         const Data = new  orderModel(data)
         await Data.save()
         res.send({"msg":"Ordered Successfully"})
      }
      }
     catch(err){
        console.log(err)
     res.send({"msg":"something went wrong"})
     
    }
})

module.exports ={orderRouter}