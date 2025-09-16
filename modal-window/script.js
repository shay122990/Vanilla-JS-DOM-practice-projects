'use strict';

const openModalBtns = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
for (let i = 0; i < openModalBtns.length; i++) {
  const btn = openModalBtns[i];
  btn.addEventListener('click', openModal);
}
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      closeModal();
    }
  }
});
