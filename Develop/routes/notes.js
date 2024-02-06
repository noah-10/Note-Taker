const notes = require('express').Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils.js');

// Allows to generate a random number for id
const gui = require('generate-unique-id')

// variable for the route to the database
const notesFilePath = './Develop/db/notes.json'

// Get route for returning all notes
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

// Post route to send the users note to be saved in the database
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

// Delete route to delete a specific note
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile(notesFilePath)
    .then((data) => JSON.parse(data))
    .then((json) => {

        // Makes a new array of all notes except the id of the note the user wants deleted
        const result = json.filter((note) => note.id !== noteId);

        // Write this new file to the database
        writeToFile(notesFilePath, result);

        res.json(`Note ${noteId} has been deleted`);
    })
    .catch((error) => {
        console.error("Error with deleting note", error);
    })
})

module.exports = notes;