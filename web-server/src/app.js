const path = require('path')

const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

// Setup handlebars engine and views location
app.set('view engine', 'hbs')  // setting templating engine to hbs
app.set('views', viewsPath)  // setting custom views directory
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'John Doe'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'John Doe'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is a weather app.',
    name: 'John Doe'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide an address.' })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({ location, forecast: forecastData, address: req.query.address })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide a search term.' })
  }
  console.log(req.query.search)
  res.send({ products: [] })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'John Doe',
    error: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'John Doe',
    error: 'Page not found.'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
