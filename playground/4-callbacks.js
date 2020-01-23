
setTimeout(() => {
  console.log('Two seconds are up!')
}, 2000)

const names = ['John', 'Joe', 'Frank']
const shortNames = names.filter((name) => {
  return name.length <= 4
})

const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0
    }
    callback(data)  // calling the callback function passing in data this will pass the data to the geocode callback function below
  }, 2000)
}

geocode('Toronto', (data) => {
  console.log(data)
})

const add = (x, y, callback) => {
  setTimeout(()=> {
    const sum = x + y
    callback(sum)
  }, 2000)
}

add(1, 4, (sum) => {
  console.log(sum) // Should print: 5
})
