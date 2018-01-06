console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = argv._[0];
console.log('Command: ', command);
console.log('Yargs', argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log('Note title taken');
  }
} else if (command === 'list') {
  notes.getAll();
  
} else if (command === 'read') {  
  var readResult = notes.getNote(argv.title);
  
  var message = readResult ? `Title:${readResult.title}, Body: ${readResult.body}` : 'Note not found';
  console.log(message);

} else if (command === 'remove') {
  var removeResult = notes.removeNote(argv.title);
  if(removeResult){
    console.log('note was successfully removed!');
  }
  else {
    console.log('note could not be removed');
  }
} else {
  console.log('Command not recognized');
}
