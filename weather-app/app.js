const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const address = process.argv[2]

if (address) {
  geocode(address, (error, { latitude, longitude, location }) => {
    if (error) {
      console.log('Error', error)
      return
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        console.log('Error', error)
        return
      }
      console.log(location)
      console.log(forecastData)
    })
  })
} else {
  console.log('Please provide an address.')
}
