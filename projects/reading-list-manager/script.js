'use strict';

// Classes

// Book

// Library

// Possible Book properties

// id

// title

// author

// category

// isRead

// Possible Book methods

// toggleRead()

// Possible Library methods

// addBook(book)

// removeBook(id)

// toggleBookStatus(id)

// getReadBooks()

// getUnreadBooks()

// getFilteredBooks(filterValue, searchValue)

// DOM practice

// submit form

// read values

// create instances

// render cards

// clear form

// event delegation for delete/toggle

// update stats

// empty state show/hide

// filter + search inputs

// Good practice order

// hardcode 2 books first and render them

// add form submit

// add delete

// add toggle read

// update stats

// add filter

// add search

// refactor into cleaner methods

const bookForm = document.getElementById('bookForm');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const categorySelect = document.getElementById('category');
const isReadInput = document.getElementById('isRead');

const totalBooksEl = document.getElementById('totalBooks');
const readBooksEl = document.getElementById('readBooks');
const unreadBooksEl = document.getElementById('unreadBooks');

const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const emptyState = document.getElementById('emptyState');
const bookList = document.getElementById('bookList');
const bookCardTemplate = document.getElementById('bookCardTemplate');

const Book = function (id, title, author, category, isRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.category = category;
  this.isRead = isRead;
};

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

const Library = function () {
  this.books = [];
};

Library.prototype.addBook = function (book) {
  this.books.push(book);
};

Library.prototype.removeBook = function (id) {
  this.books = this.books.filter((book) => book.id !== id);
};

Library.prototype.toggleBookStatus = function (id) {
  const book = this.books.find((book) => book.id === id);

  if (book) book.toggleRead();
};

Library.prototype.getReadBooks = function () {
  return this.books.filter((book) => book.isRead);
};

Library.prototype.getUnreadBooks = function () {
  return this.books.filter((book) => !book.isRead);
};

Library.prototype.getFilteredBooks = function (filterValue, searchValue) {
  const search = searchValue.toLowerCase().trim();

  return this.books.filter((book) => {
    const matchesFilter =
      filterValue === 'all' ||
      (filterValue === 'read' && book.isRead) ||
      (filterValue === 'unread' && !book.isRead);

    const matchesSearch =
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search);

    return matchesFilter && matchesSearch;
  });
};

const library = new Library();

const book1 = new Book(
  crypto.randomUUID(),
  'Atomic Habits',
  'James Clear',
  'Self-Development',
  true,
);

const book2 = new Book(
  crypto.randomUUID(),
  'Eloquent JavaScript',
  'Marijn Haverbeke',
  'Programming',
  false,
);

library.addBook(book1);
library.addBook(book2);

const renderStats = function () {
  const total = library.books.length;
  const read = library.getReadBooks().length;
  const unread = library.getUnreadBooks().length;

  totalBooksEl.textContent = total;
  readBooksEl.textContent = read;
  unreadBooksEl.textContent = unread;
};

const renderBooks = function () {
  const filterValue = filterSelect.value;
  const searchValue = searchInput.value;

  const filteredBooks = library.getFilteredBooks(filterValue, searchValue);

  bookList.innerHTML = '';

  filteredBooks.forEach((book) => {
    const bookCardFragment = bookCardTemplate.content.cloneNode(true);

    const card = bookCardFragment.querySelector('.book-card');
    const categoryEl = bookCardFragment.querySelector('.book-category');
    const titleEl = bookCardFragment.querySelector('.book-title');
    const authorEl = bookCardFragment.querySelector('.book-author');
    const statusEl = bookCardFragment.querySelector('.book-status');
    const toggleBtn = bookCardFragment.querySelector('.toggle-read-btn');
    const deleteBtn = bookCardFragment.querySelector('.delete-btn');

    card.dataset.id = book.id;
    toggleBtn.dataset.id = book.id;
    deleteBtn.dataset.id = book.id;

    categoryEl.textContent = book.category;
    titleEl.textContent = book.title;
    authorEl.textContent = `by ${book.author}`;
    statusEl.textContent = book.isRead ? 'Read' : 'Unread';

    statusEl.classList.toggle('read', book.isRead);
    statusEl.classList.toggle('unread', !book.isRead);

    bookList.append(bookCardFragment);
  });
};

bookList.addEventListener('click', function (e) {
  const deleteBtn = e.target.closest('.delete-btn');
  const toggleBtn = e.target.closest('.toggle-read-btn');

  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    library.removeBook(id);
    render();
  }

  if (toggleBtn) {
    const id = toggleBtn.dataset.id;
    library.toggleBookStatus(id);
    render();
  }
});

const renderEmptyState = function () {
  const filterValue = filterSelect.value;
  const searchValue = searchInput.value;

  const filteredBooks = library.getFilteredBooks(filterValue, searchValue);

  emptyState.style.display = filteredBooks.length === 0 ? 'block' : 'none';
};

const render = function () {
  renderStats();
  renderBooks();
  renderEmptyState();
};

bookForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const category = categorySelect.value;
  const isRead = isReadInput.checked;

  if (!title || !author || !category) return;

  const newBook = new Book(
    crypto.randomUUID(),
    title,
    author,
    category,
    isRead,
  );

  library.addBook(newBook);

  bookForm.reset();
  render();
});

searchInput.addEventListener('input', function () {
  render();
});

filterSelect.addEventListener('change', function () {
  render();
});

render();
