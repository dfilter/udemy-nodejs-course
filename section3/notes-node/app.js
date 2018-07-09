console.log('Starting app.js')

/**
 * Lesson 1:
 * To find moduals and other api for node js see https://nodehs.org/api
 * "require" is used to load a modual. fs can now be used to access all the functions 
 * that are part of this module.
 * "appendFile()" is used for simple file io. Here we write to a file using the fs 
 * imported earler from the fs modual.
 * Note: the latest version of nodejs requires function callback when using appendFile.
 * Optionally if you want to do write to the file syncronously you can use the 
 * "appendFileSync()" function.
 * The second parameter passed to appendFile() below is some ES6 syntax that allows for
 * easy concatination of strings and variables.
 * 
 * Lesson 2:
 * "./" inside of the require parameter is a reletive path meaning it points to the current 
 * directory.
 * 
 */

const fs = require('fs')
const os = require('os')
const _ = require('lodash')
const notes = require('./notes.js')

// console.log(_.isString(true))
// console.log(_.isString('Dirk'))

var filterArray = _.uniq(['Mike'])
console.log(filterArray)

// var res = notes.addNote()
// console.log(res)
// var sum = notes.addNumbers(1, 2)
// console.log(sum)
// var user = os.userInfo()

// // Note: the following is depreciated...
// // fs.appendFile('greetings.txt', 'Hello World!')
// // use one of the following instead:
// // fs.appendFileSync('greetings.txt', 'Hello World!')
// fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`, error => {
//     if (error) {
//         console.log('Unable to write to file.')
//     }
// })
