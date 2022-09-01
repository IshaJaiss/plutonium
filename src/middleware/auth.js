const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authenticate = function(req, res, next) {
    try{
    let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  if (!token) return res.send({ status: false, msg: "token must be present" });
  let decodedToken = jwt.verify(token, "functionup-plutonium");
if (!decodedToken)
  return res.send({ status: false, msg: "token is invalid" });
    }catch(err){
        res.send(err)
    }
    next()
}


const authorise = function(req, res, next) {
    try{
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-plutonium");
    let tokenId = decodedToken.userId
    let userId = req.params.userId;
    if(tokenId==userId){
        next()
    }
    else res.send("you are not authorized")
    // comapre the logged in user's id and the id in request
}catch(e){res.send(e)}
} 

const usercheck =async (req,res,next)=>{
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });
next()
}

module.exports.authenticate=authenticate
module.exports.authorise= authorise
module.exports.usercheck=usercheck