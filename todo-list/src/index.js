import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ChatGPT from './Chatgpt';
import Copilot from './Copilot';
import Bard from './Bard';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
let current = 0; // 0 = chatgpt, 1 = copilot, 2 = bard
if (current === 0) {
  root.render(
    <React.StrictMode>
      <ChatGPT />
    </React.StrictMode>
  );
}
else if (current === 1) {
  root.render(
    <React.StrictMode>
      <Copilot />
    </React.StrictMode>
  );
}
else if (current === 2) {
  root.render(
    <React.StrictMode>
      <Bard />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
