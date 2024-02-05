const notes = require('express').Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils.js');

const gui = require('generate-unique-id')

const notesFilePath = './Develop/db/notes.json'

// api/notes will return all data from notes.json
notes.get('/', (req, res) => {

    readFromFile(notesFilePath)
    .then((data) => {
        const notes = JSON.parse(data);
        res.json(notes);
    })
    .catch((error) => {
        console.error("Error reading notes:", error)
    })
})

notes.post('/', (req, res) => {

    console.log(req.body);

    const {title, text} = req.body;

    if(req.body){
        const newNote = {
            title,
            text,
            id : gui(),
        };

        readAndAppend(newNote, notesFilePath);
        res.json('Note added Successfully');
    }
    else{
        res.error('Error adding new note');
    }

})

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile(notesFilePath)
    .then((data) => JSON.parse(data))
    .then((json) => {

        const result = json.filter((note) => note.id !== noteId);

        writeToFile(notesFilePath, result);

        res.json(`Note ${noteId} has been deleted`);
    })
    .catch((error) => {
        console.error("Error with deleting note", error);
    })
})

module.exports = notes;