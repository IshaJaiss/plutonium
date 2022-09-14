const collegeModel = require("../model/CollegeModel")

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

const createCollege = async function (req, res) {
    try {
        let collegeData = req.body;
        let {name,fullName,logoLink}=collegeData
        
        if(!validBody(collegeData)) return res.status(404).send({status: false, msg:"body is empty"});
        if(!validation(collegeData.name)) return res.status(404).send({status: false, msg:"name is empty"});

        if(!(/^[a-z ,.'-]+$/i.test(collegeData.name))) 
            return res.status(404).send({status: false, msg:" name is not in proper format"});

        if(!validation(collegeData.fullName)) return res.status(404).send({status: false, msg:"fullname is empty"});

        if(!(/^[a-z ,.'-]+$/i.test(collegeData.fullName))) 
            return res.status(404).send({status: false, msg:" fullname is not in proper format"});

         if(!validation(collegeData.logoLink)) return res.status(404).send({status: false, msg:"logolink is empty"});

         if(!(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(collegeData.logoLink))) 
            return res.status(404).send({status: false, msg:" logolink is not in proper format"});
           
        let saveData = await collegeModel.create(collegeData);
        return res.status(201).send({ status: true, msg: "college created", data: saveData });
    } catch (error) {
        return res.status(500).send({ staus: false, msg: error.message })
    }
};

const getCollege = async function (req, res) {
    try {
        let getData = req.query;
        let saveData = await collegeModel.find(getData);
        return res.status(200).send({ status: true, msg: "Data Fetched", data:{name:saveData.name,fullName:saveData.fullName,logoLink:saveData.logoLink,interns:saveData,interns} })
    } catch (error) {
        return res.status(500).send({ staus: false, msg: error.message })

    }

}

// "name": "xyz",
//     "fullName": "Some Institute of Engineering and Technology",
//     "logoLink": "some public s3 link for a college logo",
//     "interns": [
//       {
//         "_id": "123a47301a53ecaeea02be59",
//         "name": "Jane Doe",
//         "email": "jane.doe@miet.ac.in",
//         "mobile": "8888888888"

module.exports.createCollege = createCollege
module.exports.getCollege = getCollege