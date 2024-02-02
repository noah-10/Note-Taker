const notes = require('express').Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils.js');

const newGui = require('../helpers/GUI.js');

const notesFilePath = './db/notes.json'

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
            note_id : newGui(),
        };

        readAndAppend(newNote, './db/notes.json');
        res.json('Note added Successfully');
    }
    else{
        res.error('Error adding new note');
    }

})

module.exports = notes;