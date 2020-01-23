const request = require('request')

const geocode = (address, callback) => {
  const mapBoxToken = 'pk.eyJ1IjoiZGZpbHRlciIsImEiOiJjazVvOHBlNnoxaXBhM21wbGtnYjBtcWJxIn0.Kq-fGgiMb46Nz6TmMwHQwQ'
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapBoxToken}`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to geocoding service.', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to geocode location.', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
