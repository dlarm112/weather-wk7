var express = require('express');
var router = express.Router();
const getGeocode = require('../utils/getGeocode')
const getForecast = require('../utils/getForecast')

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
  console.log(forecast)
  return res.render('index', { 
    title: 'Awesome Weather App',
    forecast: forecast.current
})
  }catch(err){
    next(err)
  }
});

module.exports = router;
