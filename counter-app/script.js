const counter = document.getElementById('counter');
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const resetBtn = document.getElementById('reset');

let count = 0;

increaseBtn.addEventListener('click', function () {
  count++;
  counter.textContent = count;
  counter.style.color = 'green';
});

decreaseBtn.addEventListener('click', function () {
  count--;
  counter.textContent = count;
  counter.style.color = 'red';
});
resetBtn.addEventListener('click', function () {
  count = 0;
  counter.textContent = count;
  counter.style.color = 'black';
});
