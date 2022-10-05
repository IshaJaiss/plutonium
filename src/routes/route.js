const express = require('express');
const router=express.Router()
const urlcontroller=require('../controller/urlcontroller')
router.post("/url/shorten",urlcontroller.createshorturl)
router.get("/:urlCode",urlcontroller.geturl)

router.all("",(req,res)=>{
    return res.status(400).send({status:false,message:"Given path are not found !!!"})
})



module.exports = router;
// adding this comment for no reason