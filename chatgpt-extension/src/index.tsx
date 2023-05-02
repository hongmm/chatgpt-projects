import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createRoot} from 'react-dom/client';
import Popup from './popup';

const root = document.createElement("div")
root.className = "container"
document.body.appendChild(root)
const rootDiv = createRoot(root)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
