const express = require('express');


const route = require('./routes/route')
const app = express();
const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://Chanchal25-DB:gFTcvqSDyVwmFSO9@cluster0.ypi01as.mongodb.net/group-47-Database", {

})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use(express.json());

app.use('/', route);
app.listen(3000);





