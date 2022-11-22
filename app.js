const booksContainer = document.querySelector(".books-container");



const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToTheLibrary(book) {
    myLibrary.push(book);
}

const book1 = new Book("Robinson Cruose", "Daniel Deffoe", 155, false);
const book2 = new Book("Robinson Cruose", "Daniel Deffoe", 155, true);

addBookToTheLibrary(book1);
addBookToTheLibrary(book2);

function loadLibrary() {
    for (let book of myLibrary) {
        const h3 = document.createElement("h3");
        h3.textContent = book.title;
        const h4 = document.createElement("h4");
        h4.textContent = book.author;
        const readButton = document.createElement("button");
        readButton.textContent = book.isRead ? "read" : "unread";
        const bookDiv = document.createElement("div");
        bookDiv.appendChild(h3);
        bookDiv.appendChild(h4);
        bookDiv.appendChild(readButton);
        booksContainer.appendChild(bookDiv);
    }

}

loadLibrary();
