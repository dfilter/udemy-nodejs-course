const https = require('https')

const darkSkyToken = '6c09234f97d28e86980a146f7b41c506'
const url = `https://api.darksky.net/forecast/${darkSkyToken}/40,-75?units=si`

const request = https.request(url, (response) => {
  let data = ''
  response.on('data', (chunk) => {
    console.log(chunk)
    data += chunk.toString()
  })
  response.on('end', () => {
    const body = JSON.parse(data)
    console.log(body)
  })
})

request.on('error', (error) => {
  console.log(error)
})

request.end()
