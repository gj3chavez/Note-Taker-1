const express = require('express');
const app = express();

const notes = require('./notes');

app.use('/', notes);

module.exports = app



// const path = require('path');

// module.exports = function (app){
//     app.get('/', function (req, res){
//         res.sendFile(path.join(__dirname, '../public/assets/index.html'));  
//     });
//     app.get('/notes', function(re, res){
//         res.sendFile(path.join(__dirname, '../public/assets/notes.html'));
//     });
// }