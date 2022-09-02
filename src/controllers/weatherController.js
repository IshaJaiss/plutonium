let axios = require("axios")


const getWeather = async function(req, res){
try{
    let place = req.query.q
    let appId = req.query.appid

    var options = { 
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${appId}`
    }
        let result = await axios(options)
        let data = result.data.main.temp
        res.status(200).send({City: place, Temperature: data})

}
catch(error){
    res.status(500).send({error: error.msg})
}
}

const getCity = async function(req, res){
    try {
        let cities =  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObject = []

        for(i=0; i<cities.length; i++){
            let obj = {city: cities[i] }
            let options = {
                method: "get",
                url : `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=d1cc4b09f561e2066b9ed28eb6ab374f`
            }
            let result = await axios(options)
            obj.temp= result.data.main.temp
            cityObject.push(obj)
        }
        let sortData = cityObject.sort(function(a,b) {return a.temp - b.temp})
        res.status(200).send({Data : sortData})

    }catch(error){
        res.status(500).send({error: error.message})
    }
}


module.exports.getWeather = getWeather
module.exports.getCity = getCity