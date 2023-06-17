import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import VoiceRecorder from './voiceRecorder.js';
import tts from './convertTextToSpeech.js';

const App = () => {
  const [filename, setFilename] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/transcribe', { filename });
      console.log(response.data);
      await tts(response.data.text);
    } catch (error) {
      console.error('Error transcribing file', error);
    }
  };

  return (
    <div>
      <h1>Record your question</h1>
      <VoiceRecorder />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={filename}
          onChange={(event) => setFilename(event.target.value)}
          placeholder="Enter the filename of the recording"
        />
        <button type="submit">Transcribe</button>
      </form>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
