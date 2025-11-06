'use strict';

const billInput = document.getElementById('billInput');
const tipInput = document.getElementById('tipInput');
const calcBtn = document.getElementById('calcBtn');
const resetBtn = document.getElementById('resetBtn');
const errorText = document.getElementById('error');
const tipText = document.getElementById('tipText');
const totalText = document.getElementById('totalText');

calcBtn.addEventListener('click', function () {
  const bill = parseFloat(billInput.value);
  const tip = parseFloat(tipInput.value);

  if (isNaN(bill) || isNaN(tip) || bill <= 0 || tip < 0) {
    error.hidden = false;
    tipText.textContent = 'Tip: $0.00';
    totalText.textContent = 'Total: $0.00';
  }
  error.hidden = true;

  const tipAmount = (bill * tip) / 100;
  const totalAmount = bill + tipAmount;

  tipText.textContent = 'Tip: $' + tipAmount.toFixed(2);
  totalText.textContent = 'Total: $' + totalAmount.toFixed(2);

  if (totalAmount > 100) {
    totalText.style.color = '#55efc4';
  } else {
    totalText.style.color = 'var(--text)';
  }
});

resetBtn.addEventListener('click', function () {
  billInput.value = '';
  tipInput.value = '';
  tipText.textContent = 'Tip: $0.00';
  totalText.textContent = 'Total: $0.00';
  totalText.style.color = 'var(--text)';
  error.hidden = true;
});
