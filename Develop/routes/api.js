// Requirements
const express = require('express');

// Import modular routers for /notes
const notesRouter = require('./notes.js');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;