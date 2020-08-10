const socket = io()

const $locationButton = document.querySelector('#send-location')
const $messageForm = document.querySelector('#message-form')
const $messageBox = $messageForm.querySelector('textarea')
const $messageSubmit = $messageForm.querySelector('button')

socket.on('message', (message) => {
  console.log(message)
})

$messageForm.addEventListener('submit', (event) => {
  event.preventDefault()
  $messageSubmit.setAttribute('disabled', 'disabled')

  socket.emit('sendMessage', $messageBox.value, (error) => {
    $messageSubmit.removeAttribute('disabled')
    $messageBox.value = null
    $messageBox.focus()
    if (error) {
      return console.log(error)
    }
    console.log('Message delivered!')
  })
})

$locationButton.addEventListener('click', (event) => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.')
  }
  $locationButton.setAttribute('disabled', 'disabled')
  navigator.geolocation.getCurrentPosition((position) => {
    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    socket.emit('sendLocation', coords, () => {
      console.log('Location shared!')
      $locationButton.removeAttribute('disabled')
    })
  })
})
