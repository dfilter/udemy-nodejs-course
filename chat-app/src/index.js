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

let count = 0

io.on('connection', (socket) => {
  console.log('New Websocket Connection.')

  // server emits increment event to clients
  socket.emit('countUpdated', count)

  // server receives increment event from client
  socket.on('increment', () => {
    count++
    // socket.emit('countUpdated', count)  // only send to this connection
    io.emit('countUpdated', count)  // emit count to all connected client
  })
})

server.listen(port, () => {
  console.log(`Server is up on port: ${port}: http://localhost:3000`)
})
