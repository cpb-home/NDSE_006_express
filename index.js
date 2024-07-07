const express = require("express");
const { v4: uuid } = require("uuid");

class Book {
  constructor(
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = '',
    id = uuid()
  ) {
    this.id = id;
    this.title = typeof title === 'string' ? title : '';
    this.description = typeof description === 'string' ? description : '';
    this.authors = typeof authors === 'string' ? authors : '';
    this.favorite = typeof favorite === 'string' ? favorite : '';
    this.fileCover = typeof fileCover === 'string' ? fileCover : '';
    this.fileName = typeof fileName === 'string' ? fileName : '';
  }
}

const database = {
  books: [],
  users: [
    {
      id: 1,
      mail: "test@mail.ru"
    }
  ]
};

const app = express();
app.use(express.json());

app.get('/api/books', (req, res) => {
  const { books } = database;
  res.json(books);
})

app.get('/api/books/:id', (req, res) => {
  const { books } = database;
  const idx = books.findIndex(book => book.id === req.params.id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404: not found such id');
  }
})

app.put('/api/books/:id', (req, res) => {
  const { books } = database;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const idx = books.findIndex(book => book.id === req.params.id);

  if (idx !== -1) {
    books[idx] = {
      id: books[idx].id,
      title: title ? title : books[idx].title,
      description: description ? description : books[idx].description,
      authors: authors ? authors : books[idx].authors,
      favorite: favorite ? favorite : books[idx].favorite,
      fileCover: fileCover ? fileCover : books[idx].fileCover,
      fileName: fileName ? fileName : books[idx].fileName,
    };
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404: not found such id');
  }
})

app.post('/api/books', (req, res) => {
  const { books } = database;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
  books.push(newBook);

  res.status(201);
  res.json(newBook);
})

app.post('/api/user/login', (req, res) => {
  const { users } = database;

  if (users[0]) {
    res.json(users[0]);  
  } else {
    res.status(404);
    res.json('404: not found any users');
  }
})

app.delete('/api/books/:id', (req, res) => {
  const { books } = database;
  const idx = books.findIndex(book => book.id === req.params.id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json(true);
  } else {
    res.status(404);
    res.json('404: not found such id');
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);