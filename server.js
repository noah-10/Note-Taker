const express = require('express');
const path = require('path');
const { log } = require('./Develop/middleware/log.js');
const api = require('./Develop/routes/api.js');

const PORT = 3028;
const app = express();

// Custom middle to log interactions
app.use(log);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('Develop/public'));

// Get route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
});

// Wildcard route, any other parameter searches will need to the home page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'))
});

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
})