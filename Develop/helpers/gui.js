const gui = require('generate-unique-id');

const newId = gui({
    length: 5,
    includeSymbols: ['@', '#', '%']
})

module.exports = newId;

