import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

interface Note {
  id: string;
  title: string;
  content: string;
}

const saveNote = (note: Note) => {
  chrome.storage.local.get({ notes: [] }, (data) => {
    const notes = data.notes;
    notes.push(note);
    chrome.storage.local.set({ notes });
  });
};

const App = () => {
  const note: Note = {
    id: uuidv4(),
    title: 'Sample Note',
    content: 'This is a sample note.',
  };
  saveNote(note);
  return <div>Content script is working!</div>;
};

const root = document.createElement('div');
root.id = 'my-extension-root';
document.body.appendChild(root);
ReactDOM.render(<App />, root);
