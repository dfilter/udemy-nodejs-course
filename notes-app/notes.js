const chalk = require('chalk')
const fs = require('fs')

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title == title)
    if (!duplicateNote) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const getNotes = () => {
    return 'Your notes...'
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title != title)
    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note removed!'))
    } else {
        console.log(chalk.red.inverse(`Note with title: "${title}" could not be found.`))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    return notes.forEach(note => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title == title)
    if (note) {
        console.log(chalk.inverse(`Title: ${title}`), `\nNote: ${note.body}`)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote,
}
