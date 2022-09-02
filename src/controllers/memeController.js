let axios = require("axios")

const getAllMemes = async function(req, res){
    try{
        let options = {
            method: "get",
            url: `https://api.imgflip.com/get_memes`        
        }
        let result = await axios(options)
        let data = result.data
        res.status(200).send({Memes: data})
    } catch(error){
        res.status(500).send({Error: error.message})
    }
}

const memesHandler =async function(req, res){
    try{
            let options = {
            methods: "post",
            url: `https://api.imgflip.com/caption_image?template_id=181913649&text0=Front End Developer&text1=Full Stack Developer&username=chewie12345&password=meme@123`
        }
        let result = await axios(options)
        let data = result.data
        res.status(200).send( {Memes: data})

    } catch(error){
        res.status(500).send({Error: error.message})
    }
}


module.exports.getAllMemes = getAllMemes
module.exports.memesHandler = memesHandler