// var obj = {
//     name: 'Dirk'
// }

// var stringObj = JSON.stringify(obj)
// console.log(typeof stringObj)
// console.log(stringObj)

// var personString = '{"name": "Dirk", "age": 23}'
// var person = JSON.parse(personString)
// console.log(typeof person)
// console.log(person)

const fs = require('fs')

var originalNote = {
    title: 'Some title',
    body: 'Some body'
}

var originalNoteString = JSON.stringify(originalNote)
fs.writeFileSync('1-json.json', originalNoteString)

var noteString = fs.readFileSync('1-json.json')
var note = JSON.parse(noteString)
console.log(typeof note)
console.log(note)
