import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface Note {
  id: number;
  title: string;
  content: string;
} 

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const handleNoteTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(event.target.value);
  };

  const handleNoteContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(event.target.value);
  };

  const handleNoteAdd = () => {
    const newNote = { id: Date.now(), title: noteTitle, content: noteContent };
    setNotes([...notes, newNote]);
    setNoteTitle('');
    setNoteContent('');
  };

  return (
    <div>
      <h1>My Notes</h1>
      <form>
        <input type="text" placeholder="Title" value={noteTitle} onChange={handleNoteTitleChange} />
        <textarea placeholder="Content" value={noteContent} onChange={handleNoteContentChange} />
        <button type="button" onClick={handleNoteAdd}>Add Note</button>
      </form>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
