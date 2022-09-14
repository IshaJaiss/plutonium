const internModel = require("../model/InternModel");


const validation = function (data) {
    if (data == undefined || data == null) {
        return false
    }
    if (typeof (data) == "string" && data.trim() == 0) {
        return false
    }
    return true
}
const validBody = function (data) {
    if (Object.keys(data) == 0) return false
    return true
}

const createIntern = async function (req, res) {
    try {
        let interndata = req.body

        if (!validBody(interndata)) return res.status(400).send({ status: false, msg: "body is empty" });
        if (!validation(interndata.name)) return res.status(400).send({ status: false, msg: "name is empty" });

        if (!(/^[a-z ,.'-]+$/i.test(interndata.name)))
            return res.status(400).send({ status: false, msg: " name is not in proper format" });

        if (!validation(interndata.email)) return res.status(400).send({ status: false, msg: "email is empty" });

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(interndata.email)))
            return res.status(400).send({ status: false, msg: " email is not valid" });
//********************* */
        let emailData=await internModel.findOne({email:interndata.email})
           if(emailData) return res.status(400).send({status:false,msg:"email already exist "})

        if (!validation(interndata.mobile)) return res.status(400).send({ status: false, msg: "mobile number is empty" });

        if (!(/^[0]?[6789]\d{9}$/.test(interndata.mobile)))
            return res.status(422).send({ status: false, msg: " mobile number is not valid" });
        
        let mobileData=await internModel.findOne({mobile:interndata.mobile})
        if(mobileData) return res.status(404).send({status:false,msg:"mobile number already exist "})

        

    
        let saveData = await internModel.create(interndata)
        return res.status(201).send({ status: true, msg: "intern created", data: saveData })
    } catch (error) {
        return res.status(500).send({ staus: false, msg: error.message })
    }
};
module.exports.createIntern = createIntern