const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/chat', async (req, res) => {
  const text = req.body.text;
  const response = await axios.post(`https://api.openai.com/v1/engines/curie/completions`, {
    prompt: text,
    max_tokens: 100,
    n: 1,
    stop: '\n',
    temperature: 0.5
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }
  });
  res.json({ text: response.data.choices[0].text });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
