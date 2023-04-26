import React from 'react';
import { render } from 'react-dom';

const App = () => {
  return <div>Background script is running!</div>;
};

chrome.storage.sync.get("notes", function(notes) {
  // If there are no notes, create an empty array.
  if (!notes) {
    notes = [];
  }

  // Add a new note to the array.
  notes.push({
    title: "My first note",
    content: "This is my first note."
  });

  // Save the notes to storage.
  chrome.storage.sync.set({notes});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.method) {
    case "createNote":
      // Create a new note.
      chrome.storage.sync.get("notes", function(notes) {
        notes.push({
          title: request.title,
          content: request.content
        });
        chrome.storage.sync.set({notes});
        sendResponse("Note created successfully.");
      });
      break;
    case "editNote":
      // Edit a note.
      chrome.storage.sync.get("notes", function(notes) {
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].title === request.title) {
            notes[i].content = request.content;
            chrome.storage.sync.set({notes});
            sendResponse("Note edited successfully.");
            break;
          }
        }
      });
      break;
    case "deleteNote":
      // Delete a note.
      chrome.storage.sync.get("notes", function(notes) {
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].title === request.title) {
            notes.splice(i, 1);
            chrome.storage.sync.set({notes});
            sendResponse("Note deleted successfully.");
            break;
          }
        }
      });
      break;
    case "searchNotes":
      // Search for notes.
      chrome.storage.sync.get("notes", function(notes) {
        var results = [];
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].title.toLowerCase().indexOf(request.query.toLowerCase()) !== -1) {
            results.push(notes[i]);
          }
        }
        sendResponse(results);
      });
      break;
    case "shareNote":
      // Share a note.
      // TODO: Implement this feature.
      break;
  }
});

render(<App />, document.getElementById('root'));
