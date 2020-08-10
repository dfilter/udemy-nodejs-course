const http = require('http')
const path = require('path')

const express = require('express')
const Filter = require('bad-words')
const socketio = require('socket.io')

const { generateLocationMessage, generateMessage } = require('./utils/messages')

const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
  console.log('New Websocket Connection.')

  socket.on('join', ({ username, room }) => {
    socket.join(room)
    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined.`))  // broadcast only to the joined room
  })

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter()
    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed!')
    }
    io.to('room1').emit('message', generateMessage(message))
    callback()
  })

  socket.on('sendLocation', (coords, callback) => {
    io.emit('locationMessage', generateLocationMessage(coords))
    callback()
  })

  socket.on('disconnect', () => {
    io.emit('message', generateMessage('A user has left'))
  })
})

server.listen(port, () => {
  console.log(`Server is up on port: ${port}: http://localhost:3000`)
})
