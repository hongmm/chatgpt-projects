import React, { useState } from 'react';

const { Configuration, OpenAIApi } = require("openai");
let reply = '';

const configuration = new Configuration({
  organization: "org-etpF9D68wpTpvj0wPkbtPmRK",
  apiKey: process.env.OPENAI_API_KEY, // need to hardcode this for now
});

delete configuration.baseOptions.headers['User-Agent'];
const openai = new OpenAIApi(configuration);

const Popup = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getResponse = async () => {
    setIsLoading(true);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        temperature: 0,
        max_tokens: 7,
      });
      // const data = await response.json();
      
      reply = response.data.choices[0].text;
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
      {reply}
    </div>
  );
};

export default Popup;