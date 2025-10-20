'use strict';

const images = document.querySelectorAll('img');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let current = 0;

const prevSlide = function () {
  images[current].classList.remove('active');
  current--;
  if (current < 0) {
    current = images.length - 1;
  }
  images[current].classList.add('active');
};

const nextSlide = function () {
  images[current].classList.remove('active');
  current++;
  if (current === images.length) {
    current = 0;
  }
  // start from the beginning
  images[current].classList.add('active');
};
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
