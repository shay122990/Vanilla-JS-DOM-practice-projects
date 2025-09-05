'use strict';

const checkNumberBtn = document.querySelector('.check');
const messageOutput = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
let score = 20;
scoreEl.textContent = score;
const randomNumberGenerator = function () {
  const randomNum = Math.floor(Math.random() * 20) + 1;
  console.log(randomNum);
  return randomNum;
};
const randomResult = randomNumberGenerator();
const enteredNumber = function () {
  const guessInput = Number(document.querySelector('.guess').value);

  if (!guessInput) {
    messageOutput.textContent = 'Enter a number';
  }
  if (randomResult !== guessInput) {
    score--;
    scoreEl.textContent = score;
  }
  if (randomResult < guessInput) {
    messageOutput.textContent = 'Go Lower';
  } else if (randomResult > guessInput) {
    messageOutput.textContent = 'Go Higher';
  } else if (randomResult === guessInput) {
    messageOutput.textContent = 'You Got It';
  }
  console.log(guessInput, typeof guessInput);
};

checkNumberBtn.addEventListener('click', enteredNumber);
