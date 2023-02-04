const express= require("express")
const app =express()
const {connection} =require('./config/db')
const {userRouter}=require("./routes/user.routes")
var cors = require('cors')
require('dotenv').config()
const {cartRouter} =require("./routes/cart.route")
const {productRouter} = require("./routes/media.routes")
const {validator} =require("./middleware/validator.middleware")
const {orderRouter} =require('./routes/order.routes')
app.use(express.json())
app.use(cors())


app.use(express.json())
app.use("/user",userRouter)
app.use(validator)
app.use("/product",productRouter)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`port runing mine at ${process.env.port}`)
        console.log("connected to db") 
    }catch(err){
        console.log(err)
        console.log("trouble in connected to db")
    }
  
})