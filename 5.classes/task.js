class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.type = null;
    this.state = 100;
  }

  fix() {
    this.state *= 1.5;
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

class Textbook extends Book {
  constructor(author, name, releaseDate, pagesCount, subject) {
    super(author, name, releaseDate, pagesCount);
    this.type = "textbook";
    this.subject = subject;
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addPrintEdition(printEdition) {
    if (printEdition.state > 30) {
      this.books.push(printEdition);
    }
  }

  findBookByYear(releaseDate) {
    const book = this.books.find((book) => book.releaseDate === releaseDate);
    return book || null;
  }

  givePrintEdition() {
    if (this.books.length === 0) {
      return null;
    } else {
      return this.books.pop();
    }
  }

  restorePrintEdition(printEdition) {
    printEdition.fix();
  }
}

const library = new Library("Главная библиотека");

const book1 = new Book("Лев Толстой", "Война и мир", 1869, 1225);
const book2 = new Book("Федор Достоевский", "Преступление и наказание", 1866, 672);
const textbook = new Textbook("Иван Иванов", "Высшая математика", 1980, 256, "математика");
const magazine = new Magazine("Вокруг света", 1925, 72);

library.addPrintEdition(book1);
library.addPrintEdition(book2);
library.addPrintEdition(textbook);
library.addPrintEdition(magazine);

const book3 = library.findBookByYear(1919);
if (!book3) {
  const newBook = new Book("Неизвестный автор", "Новая книга", 1919, 150);
  library.addPrintEdition(newBook);
}

const borrowedBook = library.givePrintEdition();

borrowedBook.state = 30;

library.restorePrintEdition(borrowedBook);

library.addPrintEdition(borrowedBook);

   