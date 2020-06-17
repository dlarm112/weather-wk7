const axios = require('axios')

const getForecast = async([lon, lat]) => {
    try{
        console.log("result datahhhhh")
        const token = process.env.OPEN_WEATHER_KEY
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${token}&units=imperial&exclude={daily,minutely}`
        const res = await axios.get(url)
        console.log("result data", res.data)
        return res.data
    }catch(err){
        throw err
    }

}

module.exports = getForecast