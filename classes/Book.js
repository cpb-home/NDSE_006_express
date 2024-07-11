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

module.exports = Book;