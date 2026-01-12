'use strict';

const checkNumberBtn = document.querySelector('.check');
const messageOutput = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.highscore');
const correctNumber = document.querySelector('.number');
const againBtn = document.querySelector('.again');
const body = document.querySelector('body');
const rightSection = document.querySelector('.right');

let score = 20;
let highScore = 0;
scoreEl.textContent = score;
highScoreEl.textContent = highScore;

const randomNumberGenerator = function () {
  const randomNum = Math.trunc(Math.random() * 20) + 1;
  // console.log(randomNum);
  return randomNum;
};
let randomResult = randomNumberGenerator();

let resetBtn = document.createElement('button');
resetBtn.textContent = 'Reset game';
resetBtn.classList.add('btn', 'reset');

const displayMessage = function (message) {
  messageOutput.textContent = message;
};
const enteredNumber = function () {
  const guessInput = Number(document.querySelector('.guess').value);

  if (!guessInput) {
    displayMessage('Enter a number');
  } else if (guessInput === randomResult) {
    displayMessage('You Got It');
    correctNumber.textContent = randomResult;
    body.style.backgroundColor = '#60b347';
    checkNumberBtn.disabled = true;

    if (score > highScore) {
      highScore = score;
      highScoreEl.textContent = highScore;
    }
  } else {
    score--;
    scoreEl.textContent = score;

    if (guessInput > randomResult) {
      displayMessage('Too High');
    } else {
      displayMessage('Too Low');
    }

    if (score <= 0) {
      displayMessage('Game Over!');
      checkNumberBtn.disabled = true;
      rightSection.appendChild(resetBtn);
    }
  }
};

const playAgain = function () {
  score = 20;
  randomResult = randomNumberGenerator();
  correctNumber.textContent = '?';
  document.querySelector('.guess').value = '';
  scoreEl.textContent = score;
  displayMessage('Start guessing...');
  body.style.backgroundColor = '#222';
  checkNumberBtn.disabled = false;
};

checkNumberBtn.addEventListener('click', enteredNumber);
againBtn.addEventListener('click', playAgain);

resetBtn.addEventListener('click', function () {
  playAgain();
  resetBtn.remove();
});
