const Urlmodel = require('../Model/Urlmodel')
const shortid = require('shortid')
const validurl = require('valid-url')

const redis = require('redis')

const { promisify } = require('util')

const redisClient = redis.createClient(
  19850,
  "redis-19850.c301.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("Uy613oXTZdzfMsGbnwPfDjAymfQ9zDFu", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});



const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);









const createshorturl = async (req, res) => {

  try {
    const { longUrl } = req.body
    if (!longUrl || typeof (longUrl) != 'string') {
      return res.status(400).send({ status: false, message: "Please enter longurl and it's must be in string format" })
    }
    if (!validurl.isUri(longUrl)) return res.status(400).send({ status: false, message: "Enter valid url path !" })
    let longurlcache = await GET_ASYNC(longUrl)

    if (longurlcache) {
      let data = JSON.parse(longurlcache)
      console.log("Send from redis cache !")
      let url = data.shortUrl.toLowerCase()
      return res.status(400).send({ status: false, message: "url Already exit", data: url })
    }
    let id = shortid.generate()  //hggff
    const Data = new Urlmodel({ longUrl: longUrl, shortUrl: `http://localhost:3000/${id.toLowerCase()}`, urlCode: id })
    const result = await Data.save()
    await SET_ASYNC(longUrl, JSON.stringify(result))
    return res.status(201).send({ status: true, data: result })
  }
  catch (e) {
    return res.status(500).send({ status: false, message: e.message })
  }
}


const geturl = async (req, res) => {
  try {
    const { urlCode } = req.params
    let urldata = await GET_ASYNC(`${urlCode}`)
    
    if (urldata) {
      let data = JSON.parse(urldata)
      console.log("send from redis cache ")

      return res.status(302).redirect(data.longUrl)
    }
    let result = await Urlmodel.findOne({ urlCode: urlCode })

    await SET_ASYNC(`${urlCode}`, JSON.stringify(result))
    console.log("send from database ")
    return res.status(302).redirect(result.longUrl)
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}


module.exports.createshorturl = createshorturl
module.exports.geturl = geturl