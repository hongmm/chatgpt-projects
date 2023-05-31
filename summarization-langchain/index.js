import express from "express";
import router from './googleSearch.js';
const app = express();

app.use('/', router);

app.listen(3000, function() {
  console.log('App listening on port 3000!');
});
