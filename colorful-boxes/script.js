'use strict';

const boxes = document.querySelectorAll('.box');
const colorName = document.getElementById('colorName');
const resetBtn = document.getElementById('resetBtn');
boxes.forEach((box) => {
  box.addEventListener('click', () => {
    const color = box.dataset.color;
    document.body.style.backgroundColor = color;
    colorName.textContent = `Background: ${color}`;
  });
});

resetBtn.addEventListener('click', () => {
  document.body.style.backgroundColor = 'white';
  colorName.textContent = 'Background: white';
});
