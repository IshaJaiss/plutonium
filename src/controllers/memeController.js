let axios = require("axios");


const getmemes = async function (req,res){
  try{
    let memes = await axios.get("https://api.imgflip.com/get_memes")
    res.status(200).send(memes.data)
  }catch(err){
    res.status(500).send(err)
  }
}

// assignment no 3 solved 
const memecreate = async function (req, res) {
    try {
      let template = req.query.template_id;
      let text = req.query.text0;
      let text1 = req.query.text1;
      let meme = await axios.post(
        `https://api.imgflip.com/caption_image?template_id=${template}&text0=${text}&text1=${text1}&username=prakashku5566&password=9570938768`
      );
      res.status(200).send(meme.data)
    } catch (err) {
      res.status(500).send(err);
    }
  };

  module.exports.memecreate=memecreate;
  module.exports.getmemes=getmemes