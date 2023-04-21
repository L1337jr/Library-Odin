let myLibrary = [];

const add = document.querySelector(".btn");
const form = document.querySelector("form");
const tbody = document.getElementById("list");
const $status = document.querySelector("#status");

class Book {
  constructor(name, author, status, pages) {
    this.Name = name;
    this.Author = author;
    this.Status = status;
    this.Pages = pages;
  }
}

function addBookToLibrary(bookName, bookAuthor, status, pagesN) {
  const newBook = new Book(bookName, bookAuthor, status, pagesN);
  myLibrary.push(newBook);
  render();
  saveToLocalStorage();
}

function render() {
  tbody.textContent = "";
  for (let i = 0; i < myLibrary.length; i += 1) {
    const div = document.createElement("tr");
    div.setAttribute("class", "book");
    tbody.appendChild(div);

    const title = document.createElement("td");
    title.setAttribute("class", "title");
    title.textContent = myLibrary[i].Name;
    div.appendChild(title);

    const author = document.createElement("td");
    author.setAttribute("class", "author");
    author.textContent = myLibrary[i].Author;
    div.appendChild(author);

    const pages = document.createElement("td");
    pages.setAttribute("class", "pages");
    pages.textContent = myLibrary[i].Pages;
    div.appendChild(pages);

    const status = document.createElement("td");
    const statusbtn = document.createElement("button");
    statusbtn.setAttribute("id", "statusBTN");
    statusbtn.setAttribute("class", "statusBTN");
    statusbtn.textContent = myLibrary[i].Status;
    div.appendChild(status);
    status.appendChild(statusbtn);

    const del = document.createElement("td");
    const deltbtn = document.createElement("button");
    deltbtn.setAttribute("id", "delBTN");
    deltbtn.setAttribute("class", "delBTN");
    deltbtn.textContent = "Delete";
    div.appendChild(del);
    del.appendChild(deltbtn);
  }
  form.reset();
}

function check(event) {
  event.preventDefault();
  const bookName = document.getElementById("name");
  const bookAuthor = document.getElementById("author");
  const status = document.getElementById("read");
  const pagesN = document.getElementById("number");
  if (bookName.value !== "" && bookAuthor.value !== "" && pagesN.value > "0") {
    addBookToLibrary(
      bookName.value,
      bookAuthor.value,
      status.value,
      pagesN.value
    );
  }
}

function listenClicks() {
  document.addEventListener("click", (event) => {
    const { target } = event;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    if (target.id === "add") {
      check(event);
    } else if (target.classList.contains("statusBTN")) {
      if (myLibrary[tr].Status == "Read") {
        myLibrary[tr].Status = "Not Read";
        target.textContent = "Not Read";
        saveToLocalStorage();
      } else {
        myLibrary[tr].Status = "Read";
        target.textContent = "Read";
        saveToLocalStorage();
      }
    } else if (target.classList.contains("delBTN")) {
      myLibrary.splice(tr, 1);
      render();
      saveToLocalStorage();
    }
  });
}

function saveToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadFromLocalStorage() {
  const library = localStorage.getItem("myLibrary");
  if (library) {
    myLibrary = JSON.parse(library);
    render();
  }
}

loadFromLocalStorage();
listenClicks();
