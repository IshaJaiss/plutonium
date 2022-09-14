const express= require ('express')
const bodyparser= require('body-parser')
const mongoose= require('mongoose')
const router= require("./route/routes")

const app= express()

app.use(bodyparser.json())
mongoose.connect("mongodb+srv://kamrebaba:ironman@cluster0.lvfp80k.mongodb.net/group38Database",{
    useNewUrlParser:true
})
.then(()=> console.log("MongoDb is Connected"))
.catch(err=> console.log(err))

app.use('/',router)

app.listen(3000, function () {
    console.log("code is running sucsessfully on port 3000")
})

