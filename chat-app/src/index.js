const http = require('http')
const path = require('path')

const express = require('express')
const Filter = require('bad-words')
const socketio = require('socket.io')

const { generateLocationMessage, generateMessage } = require('./utils/messages')
const { addUser, getUser, getUsersInRoom, removeUser } = require('./utils/users')

const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
  console.log('New Websocket Connection.')

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ ...options, id: socket.id })
    if (error) {
      return callback(error)
    }
    socket.join(user.room)
    socket.emit('message', generateMessage('Chat App', 'Welcome!'))
    socket.broadcast.to(user.room).emit('message', generateMessage(user.username, `${user.username} has joined.`))  // broadcast only to the joined room
    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)
    const filter = new Filter()
    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed!')
    }
    io.to(user.room).emit('message', generateMessage(user.username, message))
    callback()
  })

  socket.on('sendLocation', (coords, callback) => {
    const user = getUser(socket.id)
    io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, coords))
    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.room).emit('message', generateMessage(user.username, `${user.username} has left.`))
    }
  })
})

server.listen(port, () => {
  console.log(`Server is up on port: ${port}: http://localhost:3000`)
})
