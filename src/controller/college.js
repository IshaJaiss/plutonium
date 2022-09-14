const collegeModel=require("../model/CollegeModel")

const createCollege=async function(req,res){
    try {
        let collegeData=req.body;
    let saveData=await collegeModel.create(collegeData);
    return res.status(201).send({status:true,msg:"college created",data: saveData});
    } catch (error) {
        return res.status(500).send({staus:false,msg:error.message})
    }
};

module.exports.createCollege=createCollege