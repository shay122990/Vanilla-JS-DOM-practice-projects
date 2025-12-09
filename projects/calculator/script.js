'use strict';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator-buttons button');

let currentValue = '0';
let previousValue = '';
let currentOperator = null;
let shouldResetDisplay = false;

function updateDisplay(value) {
  display.textContent = value;
}

updateDisplay(currentValue);

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const number = button.dataset.number;
    const action = button.dataset.action;

    if (number !== undefined) {
    } else if (action === 'operator') {
    } else if (action === 'clear') {
    } else if (action === 'delete') {
    } else if (action === 'equals') {
    }
  });
});
