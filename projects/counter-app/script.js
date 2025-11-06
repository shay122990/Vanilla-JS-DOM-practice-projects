const counter = document.getElementById('counter');
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const resetBtn = document.getElementById('reset');

let count = 0;

const updateCounter = function () {
  counter.textContent = count;

  if (count > 0) {
    counter.style.color = 'green';
  } else if (count < 0) {
    counter.style.color = 'red';
  } else {
    counter.style.color = 'black';
  }
};
increaseBtn.addEventListener('click', function () {
  count++;
  updateCounter();
});

decreaseBtn.addEventListener('click', function () {
  count--;
  updateCounter();
});
resetBtn.addEventListener('click', function () {
  count = 0;
  updateCounter();
});
