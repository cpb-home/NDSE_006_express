const express = require("express");
const { v4: uuid } = require("uuid");
const Book = require('./classes/Book');
const database = require('./db/index');
const bodyParser = require('body-parser');

const PORT = process.env.SERVER_PORT || 3000;
const mainUrl = process.env.MAIN_URL || '/api/books';

const indexRouter = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(mainUrl, indexRouter);

app.listen(PORT);