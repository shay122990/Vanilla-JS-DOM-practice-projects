'use strict';

const boxes = document.querySelectorAll('.box');
const colorName = document.getElementById('colorName');
const resetBtn = document.getElementById('resetBtn');

const gradients = {
  red: 'linear-gradient(135deg, #ff6b6b, #ffd1d1)',
  green: 'linear-gradient(135deg, #4ade80, #d4f8cc)',
  blue: 'linear-gradient(135deg, #60a5fa, #dbeafe)',
  yellow: 'linear-gradient(135deg, #ffe08a, #fff4d0)',
  purple: 'linear-gradient(135deg, #c084fc, #f2e4ff)',
};

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    const color = box.dataset.color;
    document.body.style.background = gradients[color];
    colorName.textContent = `Background: ${color}`;
  });
});

resetBtn.addEventListener('click', () => {
  document.body.style.background = 'white';
  colorName.textContent = 'Background: white';
});
