console.log('Starting notes.js')

var addNote = (title, body) => {
    console.log('Adding note', title, body)
}

var getAll = () => {
    console.log('Getting all notes')
}

var getNote = (title) => {
    console.log('Reading note', title)
}

var removeNote = (title) => {
    console.log('Removing note', title)
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote  // es6 if key value pare are the same there is no need to use them
}
