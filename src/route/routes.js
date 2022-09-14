const express = require('express');
const router = express.Router();

const collegeController = require("../controller/college")
const internController = require("../controller/intern")

router.post("/functionup/colleges", collegeController.createCollege)
router.post("/functionup/interns", internController.createIntern)

router.get("/functionup/collegeDetails", collegeController.getCollege)

module.exports = router;