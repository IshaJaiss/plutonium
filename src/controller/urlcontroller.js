const Urlmodel=require('../Model/Urlmodel')
const shortid=require('shortid')
const validurl=require('valid-url')


const createshorturl=async(req,res)=>{

    try{
        const { longUrl } = req.body
        if (!longUrl) {
         return res.status(400).send({message:"not given"})
        }
        const urlExists = await Urlmodel.findOne({ longUrl })
        
        if (urlExists) {
            let url=urlExists.shortUrl
            return res.status(400).send({status:false,message:"url Already exit",data:url})
          }
          
        
        let id=shortid.generate()  //hhfgeh
        const Data = new Urlmodel({longUrl : longUrl,shortUrl:`http://localhost:3000/${id}` , urlCode:id  })
        const result = await Data.save()
        return res.status(201).send({status:true,data:result})
    }
    catch(e){
        return res.status(500).send({message:e.message})
    }


    }
   const geturl= async (req, res) => {
        try {
          const { urlCode } = req.params
          const result = await Urlmodel.findOne({ urlCode })
          if (!result) {
            return res.status(400).send({message:"not given"})
          }
          res.redirect(result.longUrl)
        } catch (error) {
          return res.status(500).send({message:error.message})
        }
   }
    

module.exports.createshorturl=createshorturl
module.exports.geturl=geturl
