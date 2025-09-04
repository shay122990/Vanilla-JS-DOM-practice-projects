'use strict';

// document.querySelector('.message').textContent = 'CORRECT NUMBER';
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;

// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

const checkNumberBtn = document.querySelector('.check');
const messageOutput = document.querySelector('.message');

const randomNumberGenerator = function () {
  const randomNum = Math.floor(Math.random() * 100) + 1;
  console.log(randomNum);
  return randomNum;
};
const randomResult = randomNumberGenerator();
const enteredNumber = function () {
  const guessInput = Number(document.querySelector('.guess').value);

  if (!guessInput) {
    messageOutput.textContent = 'Enter a number';
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
