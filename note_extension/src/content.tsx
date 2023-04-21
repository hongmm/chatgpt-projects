import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <div>Content script is working!</div>;
};

const root = document.createElement('div');
root.id = 'my-extension-root';
document.body.appendChild(root);
ReactDOM.render(<App />, root);
