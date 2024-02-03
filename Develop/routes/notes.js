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
            note_id : gui(),
        };

        readAndAppend(newNote, notesFilePath);
        res.json('Note added Successfully');
    }
    else{
        res.error('Error adding new note');
    }

})

module.exports = notes;