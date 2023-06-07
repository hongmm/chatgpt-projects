import express from 'express';
const app = express();
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import generateContent from './generateContent.js';
import 'dotenv/config';
import sendEmail from './sendEmail.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/blog', function (req, res) {
  generateContent(req.body.topic).then((data) => {
    sendEmail(data).then(() => {
        res.send('Done');
    });
  });
  //res.send('Received your data!');
});

app.listen(3000, function () {
  console.log('App listening on port 3000');
});

