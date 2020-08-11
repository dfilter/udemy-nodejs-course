const socket = io()

// Elements
const $locationButton = document.querySelector('#send-location')
const $messageForm = document.querySelector('#message-form')
const $messageBox = $messageForm.querySelector('input')
const $messageSubmit = $messageForm.querySelector('button')
const $messages = document.querySelector('#messages')
const $sidebar = document.querySelector('#sidebar')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoScroll = () => {
  // New message element 
  const $newMessage = $messages.lastElementChild
  // Height of the new message
  const newMessageStyles = getComputedStyle($newMessage)
  const newMessageMargin = parseInt(newMessageStyles.marginBottom)
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
  // Visible height
  const visibleHeight = $messages.offsetHeight
  // Height of messages container
  const containerHeight =  $messages.scrollHeight
  // How far have we scrolled?
  const scrollOffset = $messages.scrollTop + visibleHeight

  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight
  }
}

socket.on('message', (message) => {
  console.log(message)
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    text: message.text,
    createdAt: moment(message.createdAt).format('h:mm a')
  })
  $messages.insertAdjacentHTML('beforeend', html)
  autoScroll()
})

socket.on('locationMessage', (message) => {
  console.log(message)
  const html = Mustache.render(locationTemplate, {
    username: message.username,
    url: message.url,
    createdAt: moment(message.createdAt).format('h:mm a')
  })
  $messages.insertAdjacentHTML('beforeend', html)
  autoScroll()
})

socket.on('roomData', ({room, users}) => {
  console.log(room, users)
  const html = Mustache.render(sidebarTemplate, { room, users })
  document.querySelector('#sidebar').innerHTML = html
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

socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error)
    location.href = '/'
  }
})
