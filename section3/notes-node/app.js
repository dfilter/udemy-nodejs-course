const chalk = require('chalk')
const yargs = require('yargs')

const notes = require('./notes.js')

// const argv = yargs.argv
// var command = argv._[0]
// console.log('Command: ', command)
// console.log('Yargs', argv)

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        // console.log(`Title: ${argv.title}\nBody: ${argv.body}`)
        notes.getNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
        console.log('Removing a note!')
    }
})

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: function () {
        console.log('Listing all notes!')
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function () {
        console.log('Reading a note!')
    }
})

// if (command === 'add') {
//     var note = notes.addNote(argv.title, argv.body)
// } else if (command === 'list') {
//     notes.getAll()
// } else if (command === 'read') {
//     notes.getNote(argv.title)
// } else if (command === 'remove') {
//     notes.removeNote(argv.title)
// } else {
//     console.log('Command not recognized')
// }

yargs.parse()
