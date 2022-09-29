const Urlmodel=require('../Model/Urlmodel')
const shortid=require('shortid')
const validurl=require('valid-url')




const createshorturl=async(req,res)=>{

    try{
        const { longUrl } = req.body
        if (!longUrl || typeof(longUrl) != 'string') {
         return res.status(400).send({status:false ,message:"Please enter longurl and it's must be in  string format"})
        }
          
        if (!validurl.isUri(longUrl)) return res.status(400).send({status:false,message:"Enter valid url path !"})
        const urlExists = await Urlmodel.findOne({ longUrl })
        
        if (urlExists) {
            let url=urlExists.shortUrl.toLowerCase()
            return res.status(400).send({status:false,message:"url Already exit",data:url})
          }
          
        
        let id=shortid.generate()  //hhfgeh
        const Data = new Urlmodel({longUrl : longUrl,shortUrl:`http://localhost:3000/${id.toLowerCase()}` , urlCode:id  })
        const result = await Data.save()
        return res.status(201).send({status:true,data:result})
    }
    catch(e){
        return res.status(500).send({status:false, message:e.message})
    }


    }
   const geturl= async (req, res) => {
        try {
          const { urlCode } = req.params
          const result = await Urlmodel.findOne({ urlCode })
          if (!result) {
            return res.status(400).send({status:false ,message:"given url code is not valid !"})
          }
          res.status(302).redirect(result.longUrl)
        
          
        } catch (error) {
          return res.status(500).send( {status:false, message:error.message})
        }
   }
    

module.exports.createshorturl=createshorturl
module.exports.geturl=geturl
