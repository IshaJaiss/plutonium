let axios = require("axios");

const getdistrict = async function (req, res) {
  try {
    let district = req.query.district_id;
    let date = req.query.date;
    let result = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`,
    };
    let final = await axios(result);
    let final1 = final.data;
    res.status(200).send({ data: final1 });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.getdistrict = getdistrict;