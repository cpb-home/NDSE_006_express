const express = require("express");
const bodyParser = require('body-parser');

const PORT = process.env.SERVER_PORT || 3000;
const mainUrl = process.env.MAIN_URL || '/api/books';

const error404 = require('./middleware/404');
const indexRouter = require('./routes/index');
const bookFileRouter = require('./routes/bookFile');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use('/public', express.static(__dirname+'/public')); // запрос http://localhost:3000/api/books/public/books/картинка этот вариант из видео лекции
/*
app.use(express.static('/public'));                      // запрос http://localhost:3000/api/books/public/books/картинка
app.use(express.static('./public'));                     // запрос http://localhost:3000/api/books/public/books/картинка
app.use('/download', express.static(__dirname+'/public/book')); // запрос http://localhost:3000/api/books/download/картинка
app.use('/public', express.static('/public'));           // запрос http://localhost:3000/api/books/public/books/картинка
app.use('/download', express.static('/public'));         // запрос http://localhost:3000/api/books/download/картинка
app.use('/download', express.static('./public'));        // запрос http://localhost:3000/api/books/download/картинка
app.use('/', express.static('/'));                       // запрос http://localhost:3000/api/books/public/books/картинка
*/
app.use(mainUrl, indexRouter);
app.use(mainUrl, bookFileRouter);
app.use(error404);

app.listen(PORT);