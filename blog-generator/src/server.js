// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const generateContent = require('./generateContent');
// const postTweet = require('./postTweet');
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import generateContent from './generateContent.js';
import 'dotenv/config'
// import postTweet from './postTweet.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/data', (req, res) => {
  console.log(req.body);
  generateContent(req.body.data).then((content) => {
    // postTweet(content);
    console.log(content);
  });
  res.send('Received your data!');
});

app.listen(5000, () => console.log('Server listening on port 5000'));
