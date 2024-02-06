const fs = require('fs');
const util = require('util');

//Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

//Function to write content to a file
const writeToFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content, null, 3), (err) => {
        if(err){
            console.error(err);
        }
        else{
            console.info(`\nData written to ${destination}`);
        }
    })
};

//function to be able to append a piece of content to a file
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err){
            console.error(err);
        }
        else{
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

module.exports = {readFromFile, writeToFile, readAndAppend};