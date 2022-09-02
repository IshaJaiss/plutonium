const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const Weather = require("../controllers/wheatherController")
const memes = require("../controllers/memeController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)
router.get("/cowin/findByDistrict",CowinController.getDistrictsById)

//------------------------ Weather Data ------------------------------------------------

router.get("/weather/getWeather", Weather.getWeather)
router.get("/weather/getCity", Weather.getCity)

//-----------------------Memes Data --------------------------------------

router.get("/memes/getAllMemes", memes.getAllMemes)
router.post("/memes/memesHandler", memes.memesHandler)



module.exports = router;