const express= require('express')
const productRouter =express.Router()
const {mediaModel} =require("../models/media.model")


productRouter.get("/:path",async(req,res)=>{
   const category =req.params.path;
   let arr =[{category:category}];
   const query =req.query;
   let sortBy={}
   if(query.price){
    let [min,max] =query.price.split("-").map(Number)
    arr.push({price:{$gte:min}})
    arr.push({price:{$lte:max}})
   }
   if(query.sortBy){
    if(query.sortBy=="asc"){
        sortBy={
           price:"asc"
        }
    }else{
        if(query.sortBy=="desc"){
            sortBy={
               price:"desc"
            }
    }
   }
}
    try{
     const data = await mediaModel.find({$and:arr}).sort(sortBy);
     console.log(data)
     res.json(data)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})
productRouter.post("/search",async(req,res)=>{
    const payload =req.body;
    // console.log(payload)
    try{
       const data =await  mediaModel.find({title:{$regex:payload.payload,$options:"i"}})
       res.send({data:data})
    }catch(err){
    //  console.log(err)
     res.send({"msg":"soething went wrong"})
    }
})


productRouter.get("/single/:id",async(req,res)=>{
    console.log(req.params.id)
   
      try{
       const data = await mediaModel.findById({_id:req.params.id});
    //    console.log(data)
       res.json({data:data})
      }catch(err){
          console.log(err)
          res.send(err)
      }
  })



// productRouter.patch("/update/:id",async(req,res)=>{
//    const payload =req.body;
   
//      const id =req.params.id;
//   const userId =req.body.userId;
//   const note =await mediaModel.findOne({"_id":id})
//   try{
//     if(note.userId !== userId){
//       return res.send("You are not authorised to do it")
//   }else{
//   const data =  await mediaModel.findByIdAndUpdate({"_id":id},payload)
//     return res.send("updated")
//     console.log(data)
//   }
//   }catch(err){
//     res.send("err")
//     console.log({"err":"something went wrong"})
//   }
// })


// productRouter.delete("/update/:id",async(req,res)=>{
//       const id =req.params.id;
//    const userId =req.body.userId;
//    const note =await mediaModel.findOne({"_id":id})
//    try{
//      if(note.userId !== userId){
//        return res.send("You are not authorised to do it")
//    }else{
//    const data =  await mediaModel.findByIdAndDelete({"_id":id})
//      return res.send("deleted")
//      console.log(data)
//    }
//    }catch(err){
//      res.send("err")
//      console.log({"err":"something went wrong"})
//    }
//  })
 
 module.exports ={productRouter}
