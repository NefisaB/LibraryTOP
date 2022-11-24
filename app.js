const booksContainer = document.querySelector(".books-container");
const addBookDiv = document.querySelector(".add-btn-div");
const addBookBtn = document.querySelector(".add-book");
const formDiv = document.querySelector(".form-div");
const form = document.querySelector("form");
const titleEl = document.getElementById("title");
const authorEl = document.getElementById("author");
const pagesEl = document.getElementById("pages");
const readEl = document.querySelector(".read");

let id = 1;

function Book(title, author, pages, isRead) {
    this.id = id++;
    this.title = title || "Unknown";
    this.author = author || "Unknown";
    this.pages = pages || 0;
    this.isRead = isRead || false;
}

Book.prototype.toggleRead = function () {
    this.isRead = !this.isRead;
}

const myLibrary = [];

function deleteBook(itemId) {
    const foundIndex = myLibrary.findIndex(el => {
        return el.id === parseInt(itemId);
    });
    myLibrary.splice(foundIndex, 1);
    document.querySelector(`[data-id="${itemId}"]`).remove();
}

function updateReadStatus(itemId) {
    const foundIndex = myLibrary.findIndex(el => {
        return el.id === parseInt(itemId);
    });
    const modifiedItem = myLibrary[foundIndex];
    modifiedItem.toggleRead();
    myLibrary[foundIndex] = modifiedItem;
    document.querySelector(`[data-id="${itemId}"]`).lastChild.firstChild.textContent = modifiedItem.isRead ? "read" : "unread";
}

function createBookDiv(item) {
    console.log(item);
    const h3 = document.createElement("h3");
    h3.textContent = item.title;
    const h4 = document.createElement("h4");
    h4.textContent = item.author;
    const readButton = document.createElement("button");
    readButton.classList.add("read-button");
    readButton.innerText = item.isRead ? "read" : "unread";
    readButton.setAttribute("onclick", `updateReadStatus("${item.id}")`);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.classList.add("delete-button");
    deleteBtn.setAttribute("onclick", `deleteBook("${item.id}")`);
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons-div");
    buttonsDiv.appendChild(readButton);
    buttonsDiv.appendChild(deleteBtn);
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-container");
    bookDiv.setAttribute("data-id", item.id);
    bookDiv.appendChild(h3);
    bookDiv.appendChild(h4);
    bookDiv.appendChild(buttonsDiv);
    booksContainer.insertBefore(bookDiv, addBookDiv);
}

function loadLibrary() {
    for (let item of myLibrary) {
        createBookDiv(item);
    }
}

function toggleForm() {
    formDiv.classList.toggle("hidden");
    formDiv.classList.toggle("show");
}


function addBookToLibrary(e) {
    e.preventDefault();
    const newBook = new Book(titleEl.value, authorEl.value, pagesEl.value, readEl.checked);
    myLibrary.push(newBook);
    createBookDiv(newBook);
    form.reset();
    toggleForm();
}

addBookBtn.addEventListener("click", toggleForm);

form.addEventListener("submit", addBookToLibrary);

loadLibrary();
