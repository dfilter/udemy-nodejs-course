// callback pattern:
const doWorkCallback = (callback) => {
  setTimeout(() => {
    // callback('This is my error', undefined)
    callback(undefined, [1, 2, 3])
  }, 2000)
}

// doWorkCallback((error, result) => {
//   if (error) {
//     return console.log(error)
//   }
//   console.log(result)
// })

// promise pattern:
const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve([1,2,3])
    reject('There was an error!')
  }, 2000)
})

doWorkPromise.then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
