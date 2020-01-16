const fs = require('fs')


const fetchNotes = () => {
    try {
        const notesString = fs.readFileSync('notes-data.json')
        return JSON.parse(notesString.toString())
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes)) 
}

const addNote = (title, body) => {
    let notes = fetchNotes()
    let note = {
        title,
        body
    }

    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push(note)
        saveNotes(notes)
        console.log('Note successfully added.')
        return notes
    }

    console.log('Note title in use!')
}

const getAll = () => {
    console.log('Getting all notes')
}

const getNote = (title) => {
    console.log('Reading note', title)
}

const removeNote = (title) => {
    console.log('Removing note', title)
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote  // es6 if key value pair are the same there is no need to use them
}
