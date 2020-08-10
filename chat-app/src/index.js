const http = require('http')
const path = require('path')

const express = require('express')
const socketio = require('socket.io')

const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
  console.log('New Websocket Connection.')
  socket.emit('message', 'Welcome!')
  socket.broadcast.emit('message', 'A new user has joined.')

  socket.on('sendMessage', (message) => {
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left')
  })
})

server.listen(port, () => {
  console.log(`Server is up on port: ${port}: http://localhost:3000`)
})
