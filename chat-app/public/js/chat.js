const socket = io()

socket.on('message', (message) => {
  console.log(message)
})

const messageForm = document.querySelector('#message-form')
const messageBox = document.querySelector('#message-box')
const locationButton = document.querySelector('#send-location')

messageForm.addEventListener('submit', (event) => {
  event.preventDefault()

  socket.emit('sendMessage', messageBox.value)
  messageBox.value = null
})

locationButton.addEventListener('click', (event) => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.')
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  })
})
