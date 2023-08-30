class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
      this.name = name;
      this.releaseDate = releaseDate;
      this.pagesCount = pagesCount;
      this.type = null;
      this.state = 100;
    }
  
    fix() {
      this.state = this.state * 1.5;
    }
  
    set state(state) {
      if (state < 0) {
        this._state = 0;
      } else if (state > 100) {
        this._state = 100;
      } else {
        this._state = state;
      }
    }
  
    get state() {
      return this._state;
    }
  }
  
  class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
      super(name, releaseDate, pagesCount);
      this.type = "magazine";
    }
  }
  
  class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
      super(name, releaseDate, pagesCount);
      this.type = "book";
      this.author = author;
    }
  }
  
  class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = "novel";
    }
  }
  
  class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = "fantastic";
    }
  }
  
  class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = "detective";
    }
  }
   
   class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }
}

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
}

findBookBy(type, value) {
    const book = this.books.find((book) => book[type] === value);
    return book || null;
}

giveBookByName(bookName) {
    const index = this.books.findIndex((book) => book.title === bookName);
    if (index === -1) {
      return null;
    } else {
      return this.books.splice(index, 1)[0];
    }
}


const library = new Library("Главная библиотека");


const book1 = new Book("Война и мир", "Лев Толстой", 1869);
const book2 = new Book("Преступление и наказание", "Федор Достоевский", 1866);
const textbook = new Textbook("Высшая математика", "Иван Иванов", 1980, "математика");
const magazine = new Magazine("Вокруг света", 1925, 5);

library.addPrintEdition(book1);
library.addPrintEdition(book2);
library.addPrintEdition(textbook);
library.addPrintEdition(magazine);


const book3 = library.findBookByYear(1919);
if (!book3) {
  const newBook = new Book("Новая книга", "Неизвестный автор", 1919);
  library.addPrintEdition(newBook);
}


const borrowedBook = library.givePrintEdition();


borrowedBook.isDamaged = true;


library.restorePrintEdition(borrowedBook);


library.addPrintEdition(borrowedBook);


   