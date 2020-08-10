const socket = io()

socket.on('message', (message) => {
  console.log(message)
})

const messageForm = document.querySelector('#message-form')
const messageBox = document.querySelector('#message-box')
const locationButton = document.querySelector('#send-location')

messageForm.addEventListener('submit', (event) => {
  event.preventDefault()

  socket.emit('sendMessage', messageBox.value, (error) => {
    messageBox.value = null
    if (error) {
      return console.log(error)
    }
    console.log('Message delivered!')
  })
})

locationButton.addEventListener('click', (event) => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.')
  }
  navigator.geolocation.getCurrentPosition((position) => {
    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    socket.emit('sendLocation', coords, () => {
      console.log('Location shared!')
    })
  })
})
