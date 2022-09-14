const express= require ('express')
const bodyparser= require('body-parser')
const mongoose= require('mongoose')
const router= require("../route/routes")

const app= express()

app.use(bodyparser.json())
mongoose.connect("mongodb+srv://kamrebaba:%3Cironman%3E@cluster0.lvfp80k.mongodb.net/project2nd",{
    useNewUrlParser:true
})
.then(()=> console.log("MongoDb is Connected"))
.catch(err=> console.log(err))

app.use('/',router)

app.listen(process.env.PORT || 3000, function(req,res){
    res.send(console.log("express app running on port" +(process.env.PORT || 3000)))
})