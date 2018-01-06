console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  console.log('Getting all notes');
};

var getNote = (title) => {
  var allNotes = fetchNotes();  
  var noteToGet = allNotes.filter((note)=>{
    return title === note.title;
  });

  if(noteToGet.length !== 0){
    return noteToGet[0];
  } 
};

var removeNote = (title) => {
  var allNotes = fetchNotes();  
  var notesToSave = allNotes.filter((note)=>{
    return title !== note.title;
  });
  saveNotes(notesToSave);
  return allNotes.length !== notesToSave.length;
  
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};
