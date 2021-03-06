/* eslint-disable max-classes-per-file */
import Library from '../modules/Library.js';
import { show, hide } from '../modules/utils.js';
import { DateTime } from '../node_modules/luxon/src/luxon.js';
import {
  addBookButton,
  showBooksSection,
  addBookLink,
  contactLink,
  homeLink,
  contactSection,
  newBookSection,
  footerTime,
  time,
} from '../modules/elements.js';

const dt = DateTime.now();

export const library = new Library();

export const showHome = () => {
  if (library.books.length) {
    show(showBooksSection);
  }

  hide(newBookSection);
  hide(contactSection);
  library.displayBooks();
};

export const showBookForm = () => {
  show(newBookSection, 'flex');
  hide(showBooksSection);
  hide(contactSection);
};

export const showContact = () => {
  show(contactSection, 'flex');
  hide(showBooksSection);
  hide(newBookSection);
};

homeLink.addEventListener('click', showHome);
addBookLink.addEventListener('click', showBookForm);
contactLink.addEventListener('click', showContact);

addBookButton.addEventListener('click', library.addBook);
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'delete_book') {
    library.deleteBook(Number(e.target.dataset.id));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  library.createLocalStorage();
  library.displayBooks();

  if (library.books.length) {
    show(showBooksSection);
  }

  footerTime.innerHTML = dt.year;
});

// update time
setInterval(() => {
  const now = DateTime.now();
  const currentTime = now.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  time.innerHTML = currentTime;
}, 1000);
