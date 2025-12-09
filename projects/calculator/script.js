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

function formatResult(num) {
  if (!Number.isFinite(num)) return 'Error';
  if (Number.isInteger(num)) return String(num);
  return String(+num.toFixed(10));
}

function calculate(a, b, operator) {
  const x = parseFloat(a);
  const y = parseFloat(b);
  if (isNaN(x) || isNaN(y)) return '0';

  let result;
  switch (operator) {
    case '+':
      result = x + y;
      break;
    case '-':
      result = x - y;
      break;
    case '*':
      result = x * y;
      break;
    case '/':
      if (y === 0) return 'Error';
      result = x / y;
      break;
    default:
      return b;
  }

  return formatResult(result);
}

function handleNumberClick(num) {
  if (shouldResetDisplay) {
    currentValue = num === '.' ? '0.' : num;
    shouldResetDisplay = false;
    updateDisplay(currentValue);
    return;
  }

  if (num === '.') {
    if (currentValue.includes('.')) return;
    currentValue += '.';
  } else {
    if (currentValue === '0') {
      currentValue = num;
    } else {
      currentValue += num;
    }
  }

  updateDisplay(currentValue);
}

function handleOperatorClick(operatorSymbol) {
  if (currentOperator && !shouldResetDisplay) {
    const result = calculate(previousValue, currentValue, currentOperator);
    currentValue = result;
    updateDisplay(currentValue);
  }

  previousValue = currentValue;
  currentOperator = operatorSymbol;
  shouldResetDisplay = true;
}

function handleClear() {
  currentValue = '0';
  previousValue = '';
  currentOperator = null;
  shouldResetDisplay = false;
  updateDisplay(currentValue);
}

function handleDelete() {
  if (shouldResetDisplay) {
    shouldResetDisplay = false;
    currentValue = '0';
    updateDisplay(currentValue);
    return;
  }

  if (currentValue.length <= 1) {
    currentValue = '0';
  } else {
    currentValue = currentValue.slice(0, -1);
  }

  updateDisplay(currentValue);
}

function handleEquals() {
  if (!currentOperator || shouldResetDisplay) return;
  const result = calculate(previousValue, currentValue, currentOperator);
  currentValue = result;
  previousValue = '';
  currentOperator = null;
  shouldResetDisplay = true;
  updateDisplay(currentValue);
}

updateDisplay(currentValue);

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const number = button.dataset.number;
    const action = button.dataset.action;

    if (number !== undefined) {
      handleNumberClick(number);
    } else if (action === 'operator') {
      const operatorSymbol = button.textContent.trim();
      handleOperatorClick(operatorSymbol);
    } else if (action === 'clear') {
      handleClear();
    } else if (action === 'delete') {
      handleDelete();
    } else if (action === 'equals') {
      handleEquals();
    }
  });
});
