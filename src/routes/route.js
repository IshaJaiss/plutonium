const express = require('express');
const router=express.Router()
const urlcontroller=require('../controller/urlcontroller')
router.post("/url/shorten",urlcontroller.createshorturl)
router.get("/:urlCode",urlcontroller.geturl)



module.exports = router;
// adding this comment for no reason