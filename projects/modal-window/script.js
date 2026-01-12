'use strict';

const openModalBtns = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < openModalBtns.length; i++) {
  openModalBtns[i].addEventListener('click', openModal);
}

closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// “The document is a global object provided by the browser that represents the DOM. It exposes methods like addEventListener, which allows us to listen for events happening anywhere on the page. When a keydown event occurs, the browser executes the callback function and passes an event object that contains information about what happened, such as which key was pressed. We can then read and use those event properties to control our application logic.”
document.addEventListener('keydown', function (event) {
  // console.log(event);

  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
