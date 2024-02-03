const express = require('express');
const path = require('path');
const { log } = require('./Develop/middleware/log.js');
const api = require('./Develop/routes/index.js');

const PORT = 3024;
const app = express();

// Custom middle to log interactions
app.use(log);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// Wildcard route, any other parameter searches will need to the home page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'))
});

// Get route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
});

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
})