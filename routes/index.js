var express = require('express');
var router = express.Router();
const getGeocode = require('../utils/getGeocode')
const getForecast = require('../utils/getForecast')
var moment = require('moment');

/* GET home page. */
router.get('/', async function (req, res, next) {
  try{
  const {city} = req.query
  if(!city)
    return res.render('index', { title: 'Awesome Weather App' })
  
  const location = await getGeocode(city)
  console.log("location:", location)
  console.log("coooords", location.geometry.coordinates)
  const forecast = await getForecast(location.geometry.coordinates)
  console.log("forecassst", forecast)
  let timeArray = forecast.hourly
  let momentArray = timeArray.map(time => moment((time.dt*1000)).format('h:mm a'))
  let momentArrayShort = []
  let hourlyWeather = []
  let hourlyDesc = []
  for (let i = 0; i < 12; i++){
    momentArrayShort.push(momentArray[i])
    hourlyWeather.push(forecast.hourly[i].temp)
    hourlyDesc.push(forecast.hourly[i].weather[0].description)
  }
  console.log(hourlyDesc)
  return res.render('index', { 
    title: 'Awesome Weather App',
    forecast: forecast,
    momentArrayShort: momentArrayShort,
    hourlyWeather: hourlyWeather,
    hourlyDesc: hourlyDesc
})
  }catch(err){
    next(err)
  }
});

module.exports = router;
