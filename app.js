const booksContainer = document.querySelector(".books-container");
const newBtnDiv = document.querySelector(".add-btn-div");
const addBookBtn = document.querySelector(".add-book");
const formDiv = document.querySelector(".form-div");
const form = document.querySelector("form");
const titleEl = document.getElementById("title");
const authorEl = document.getElementById("author");
const pagesEl = document.getElementById("pages");

let id = 1;

function Book(title, author, pages, isRead) {
    this.id = id++;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

}

let myLibrary = [];

function updateBookStatus(title) {
    let foundIndex = myLibrary.findIndex(x => x.title === title);
    let book = myLibrary[foundIndex];
    book.isRead = !book.isRead;
    myLibrary[foundIndex] = book;
    console.log(myLibrary);

}

function toggleRead(title) {
    const items = document.querySelectorAll(".book-container");
    for (let item of items) {
        console.log(item.firstChild.textContent);
        console.log(title);
        if (item.firstChild.textContent === title) {
            item.lastChild.firstChild.textContent = item.lastChild.firstChild.textContent === "read" ? "unread" : "read";
            updateBookStatus(title);
        }
    }
}


function addBookToList(book) {
    const h3 = document.createElement("h3");
    h3.textContent = book.title;
    const h4 = document.createElement("h4");
    h4.textContent = book.author;
    const readButton = document.createElement("button");
    readButton.classList.add("read-button");
    readButton.innerText = book.isRead ? "read" : "unread";
    readButton.setAttribute("onclick", `toggleRead("${book.title}")`);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.classList.add("delete-button");
    deleteBtn.setAttribute("onclick", `deleteBook("${book.title}")`);
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons-div");
    buttonsDiv.appendChild(readButton);
    buttonsDiv.appendChild(deleteBtn);
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-container");
    bookDiv.appendChild(h3);
    bookDiv.appendChild(h4);
    bookDiv.appendChild(buttonsDiv);
    booksContainer.insertBefore(bookDiv, newBtnDiv);
}

function loadLibrary() {
    for (let book of myLibrary) {
        addBookToList(book);
    }
}

function deleteBook(title) {
    myLibrary = myLibrary.filter((book) => book.title !== title);
    booksContainer.replaceChildren(newBtnDiv);
    loadLibrary();
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
    const isReadString = document.querySelector('input[name="isRead"]:checked').value;
    const isRead = (isReadString === "true");
    const newBook = new Book(titleEl.value, authorEl.value, pagesEl.value, isRead);

    myLibrary.push(newBook);
    booksContainer.replaceChildren(newBtnDiv);
    loadLibrary();
    hideForm();
    form.reset();
});

loadLibrary();
