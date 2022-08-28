const authorModel = require('../models/authorModel')
const bookModel = require('../models/bookModel')
const publisher = require('../models/publisher')

const createauthor = async function (req,res){
    let data = req.body
  let savedData = await authorModel.create(data)
  res.send({msg:savedData})

}

const getChetanBooks = async function (req,res){
    let authorDetails = await authorModel.findOne({author_name:"Chetan Bhagat"})
    let authorId = authorDetails.author_id
    // console.log(authorId)
    let books2 = await bookModel.find({author_id:authorId}).select({name:1,_id:0})
    // console.log(books2)
    res.send({msg:books2})
}


const respondBack = async function(req, res){

    const data = await bookModel.find( { price : { $gte: 50, $lte: 100} } ).select({author_id: 1, _id:0})
    const key = data.map(inp => inp.author_id)
    let temp = []
 
    for(let i=0; i<key.length; i++){
     let x = key[i]
     const author = await authorModel.find({author_id: x}).select({authorName:1, author_id: 1 ,_id:0})
     temp.push(author)
    }
    const authorName= temp.flat()
    res.send({msg: authorName})
 }

   const createpublisher = async function(req,res){
    let data = req.body
    let savedpublisher = await publisher.create(data)
    res.send({savedpublisher})
   }


module.exports.createauthor= createauthor
module.exports.getChetanBooks =getChetanBooks 
module.exports.getBooksData=getBooksData
module.exports.respondBack=respondBack
module.exports.createpublisher=createpublisher