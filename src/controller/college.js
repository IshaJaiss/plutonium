const collegeModel = require("../model/CollegeModel")
const InternModel = require("../model/InternModel")

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

//======================================POST API COLLEGE=================================================================

const createCollege = async function (req, res) {
    try {
        let collegeData = req.body;
        let {name,fullName,logoLink}=collegeData
        
        if(!validBody(collegeData)) return res.status(400).send({status: false, msg:"body is empty"});

       //****************************NAME VALIDATIONS*************************************8 */
        if(!validation(collegeData.name)) return res.status(400).send({status: false, msg:"name is empty"});
        
        let nameData=await collegeModel.findOne({name:collegeData.name})
           if(nameData) return res.status(400).send({status:false,msg:"name already exist "})

        if(!(/^[a-z ,.'-]+$/i.test(collegeData.name))) 
            return res.status(400).send({status: false, msg:" name is not in proper format"});

        //********************************FULLNAME VALIDATIONS*************************8 */

        if(!validation(collegeData.fullName)) return res.status(400).send({status: false, msg:"fullname is empty"});

        if(!(/^[a-z ,.'-]+$/i.test(collegeData.fullName))) 
            return res.status(400).send({status: false, msg:" fullname is not in proper format"});

       //******************************LOGOLINK VALIDATIONS*********************************** */

         if(!validation(collegeData.logoLink)) return res.status(400).send({status: false, msg:"logolink is empty"});

         if(!(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(collegeData.logoLink))) 
            return res.status(400).send({status: false, msg:" logolink is not in proper format"});

         let logoData=await collegeModel.findOne({logoLink:collegeData.logoLink})
            if(logoData) return res.status(400).send({status:false,msg:"logoLink already exist "})
         
            
        let saveData = await collegeModel.create(collegeData);
        return res.status(201).send({ status: true, msg: "college created", data: {name:saveData.name,fullName:saveData.fullName,logoLink:saveData.logoLink, isDeleted:false} });
    } catch (error) {
        return res.status(500).send({ staus: false, msg: error.message })
    }
};

//=========================================GET API COLLEGE====================================================================

const getCollege = async function (req, res) {
    try {
        let getData = req.query.collegeName;
        
        let saveData = await collegeModel.findOne({name:getData});
        if(!saveData) return res.status(400).send({status:false,msg:"No college with this name found"})
        // return res.status(200).send({ status: true, msg: "Data Fetched", data:{name:saveData.name,fullName:saveData.fullName,logoLink:saveData.logoLink,interns:saveData.interns} });
        
        let collegeDataId=saveData._id
        let interns=await InternModel.find({collegeId:collegeDataId}).select({_id:1,name:1,email:1,mobile:1}) 
        if(interns.length<1) return res.status(400).send({status:false,msg:"No intern present!!!"})

        let doc={
            name:saveData.name,
            fullName:saveData.fullName,
            logoLink:saveData.logoLink,
            interns:interns
        }
        return res.status(200).send({status:true,msg:"college details fetched", data:doc})
        
    } catch (error) {
        return res.status(500).send({ staus: false, msg: error.message })

    }

}

module.exports.createCollege = createCollege
module.exports.getCollege = getCollege