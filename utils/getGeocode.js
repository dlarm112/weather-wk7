const axios = require('axios')

const getGeocode = async (address) => {
    try{
        const token = process.env.MAPBOX_KEY
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
            )}.json?access_token=${token}`
        const res = await axios.get(url);
        const data = res.data.features
        if(data.length === 0){
            throw new Error('there is no results for your city')
        }
        return data[0]
    }catch (err){
        next(err)
    }
}

module.exports = getGeocode