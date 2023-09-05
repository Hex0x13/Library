const form = document.querySelector('form');
const booksContainer = document.querySelector('.books');
const addBooksButton = document.querySelector('.add-books');
const modal = document.querySelector('.adding-book');
const inputs = modal.querySelectorAll('input');
const submitButton = document.querySelector('.submit-button');

const titleInput = modal.querySelector('#title');
const authorInput = modal.querySelector('#author');
const pageInput = modal.querySelector('#page');
const checkRead = modal.querySelector('#check-read');

addBooksButton.onclick = newBook;
submitButton.onclick = addBookToLib;
modal.onclick = closeAddBook;

let library = {};
let bookID = 1;

class Book {
  constructor(title, author, pages, checked) {
    this.title = title;
    this.author = author;
    this.pages = pages + "pg";
    this.read = checked;
  }
}
function openAddBook(){
  modal.showModal();
}

function closeAddBook(e){
  const dialogDimensions = modal.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close()
  }
}

function newBook(event) {
  openAddBook();
  event.stopPropagation();
}

function addBookToLib(event){
  event.preventDefault();
  const book = new Book(
    titleInput.value,
    authorInput.value, 
    pageInput.value,
    checkRead.checked
  );
  library[bookID++] = book;
  modal.querySelector('form').reset();
  modal.close();
  displayBooks();
}

function displayBooks() {
  booksContainer.innerHTML = '';
  for (const book in library) {
    booksContainer.appendChild(createBookElement(book, library[book]));

  }
}

function createBookElement(id, book) {
  const container = document.createElement('div');
  container.classList.add('book');

  for (const info in book){
    if (typeof book[info] === "string") {
      const element = document.createElement('div');
      element.textContent = book[info];
      container.appendChild(element);
    } else if (typeof book[info]) {
      
    }
  }
  const readButton = document.createElement('button');
  const removeButton = document.createElement('button');
  if (!book.read) {
    readButton.classList.add('not');
    readButton.textContent = 'Not Read';
  } else {
    readButton.textContent = 'Read';
  }
  removeButton.textContent = 'Remove';
  readButton.classList.add('read');
  removeButton.classList.add('remove');

  readButton.onclick = () => toggleRead(id, readButton);
  removeButton.onclick = () => removeBook(id);

  container.appendChild(readButton);
  container.appendChild(removeButton);
  return container;
}

function toggleRead(id, target) {
  target.classList.toggle('not');
  if (Array.from(target.classList).includes('not')) {
    target.textContent = 'Not Read';
    library[id].read = false;
  } else {
    target.textContent = 'Read';
    library[id].read = true;
  }
}

function removeBook(id) {
  delete library[id];
  displayBooks();
}