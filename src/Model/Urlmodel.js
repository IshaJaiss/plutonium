const mongoose=require("mongoose")
const urlschema=new mongoose.Schema({
    urlCode:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    longUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true
    }
})
module.exports=mongoose.model('Urlmodel',urlschema)

// { urlCode: { mandatory, unique, lowercase, trim }, 
// longUrl: {mandatory, valid url}, 
// shortUrl: {mandatory, unique} }