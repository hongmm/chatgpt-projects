import React, { useState, useEffect } from 'react';

const Popup = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    chrome.storage.sync.get(['notes'], (result) => {
      setNotes(result.notes);
    });
  }, []);

  return (
    <div>
      <h1>My Notes</h1>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;
