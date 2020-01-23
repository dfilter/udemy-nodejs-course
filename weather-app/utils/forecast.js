const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const darkSkyToken = '6c09234f97d28e86980a146f7b41c506'
  const url = `https://api.darksky.net/forecast/${darkSkyToken}/${latitude},${longitude}?units=si`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined)
    } else if (body.error) {
      callback('Unable to find location.', undefined)
    } else {
      const currently = body.currently
      callback(undefined, `It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast
