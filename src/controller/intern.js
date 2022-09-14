const internModel = require("../model/InternModel");

const createIntern = async function (req, res) {
    try {
        let interndata = req.body
        let saveData = await internModel.create(interndata)
        return res.status(201).send({ status: true, msg: "intern created", data: saveData })
    } catch (error) {
        return res.status(500).send({ staus: false, msg: error.message })
    }
};
module.exports.createIntern = createIntern