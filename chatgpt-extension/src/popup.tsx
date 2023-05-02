import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

const apiKey = process.env.CHATGPT_API_KEY;
const domNode = document.getElementById('popup-root');
const root = createRoot(domNode as HTMLElement)

const Popup = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getResponse = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.chatgpt.com/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          question: message,
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key === 'Enter') {
      getResponse();
    }
  };

  return (
    <div>
      <h1>ChatGPT Chrome Extension</h1>
      <input type="text" value={message} onChange={handleMessageChange} onKeyDown={handleKeyPress} />
      {isLoading ? <p>Loading...</p> : null}
    </div>
  );
};


// root.render(
//   <React.StrictMode>
//     <Popup />
//   </React.StrictMode>
// );
// ReactDOM.render(<Popup />, document.getElementById('popup-root'));

export default Popup;