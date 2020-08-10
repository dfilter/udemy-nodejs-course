const socket = io()

socket.on('message', (message) => {
  console.log(message)
})

const messageForm = document.querySelector('#message-form')

messageForm.addEventListener('submit', (event) => {
  event.preventDefault()
  
  socket.emit('sendMessage', event.target.elements.message.value)
  event.target.elements.message.value = null
})
