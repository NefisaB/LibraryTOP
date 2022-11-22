const booksContainer = document.querySelector(".books-container");
const newBtnDiv = document.querySelector(".add-btn-div");
const addBookBtn = document.querySelector(".add-book");
const formDiv = document.querySelector(".form-div");
const form = document.querySelector("form");
const titleEl = document.getElementById("title");
const authorEl = document.getElementById("author");
const pagesEl = document.getElementById("pages");
const isReadEl = document.querySelector(".isRead");


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

function addBookToList(book) {

    const h3 = document.createElement("h3");
    h3.textContent = book.title;
    const h4 = document.createElement("h4");
    h4.textContent = book.author;
    const readButton = document.createElement("button");
    readButton.classList.add("read-button");
    readButton.textContent = book.isRead ? "read" : "unread";
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-container");
    bookDiv.appendChild(h3);
    bookDiv.appendChild(h4);
    bookDiv.appendChild(readButton);
    booksContainer.insertBefore(bookDiv, newBtnDiv);
}

function loadLibrary() {
    for (let book of myLibrary) {
        addBookToList(book);
    }

}

function hideForm() {
    formDiv.classList.remove("show");
    formDiv.classList.add("hidden");
}

addBookBtn.addEventListener("click", function () {
    formDiv.classList.remove("hidden");
    formDiv.classList.add("show");
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const newBook = new Book(titleEl.value, authorEl.value, pagesEl.value, isReadEl.value);
    myLibrary.push(newBook);
    console.log(newBook);
    addBookToList(newBook);
    hideForm();
    form.reset();
});



loadLibrary();
