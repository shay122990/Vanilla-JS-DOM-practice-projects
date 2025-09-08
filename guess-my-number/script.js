'use strict';
//TODO :
// disable "check" button  after the correct number is guessed
// if score reached 0 attempts display game over
const checkNumberBtn = document.querySelector('.check');
const messageOutput = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.highscore');
const correctNumber = document.querySelector('.number');
const againBtn = document.querySelector('.again');
const body = document.querySelector('body');

let score = 20;
let highScore = 0;
scoreEl.textContent = score;
highScoreEl.textContent = highScore;

const randomNumberGenerator = function () {
  const randomNum = Math.floor(Math.random() * 20) + 1;
  console.log(randomNum);
  return randomNum;
};
let randomResult = randomNumberGenerator();
const enteredNumber = function () {
  const guessInput = Number(document.querySelector('.guess').value);

  if (!guessInput) {
    messageOutput.textContent = 'Enter a number';
  } else if (guessInput === randomResult) {
    messageOutput.textContent = 'You Got It';
    correctNumber.textContent = randomResult;
    body.style.backgroundColor = '#60b347';

    if (score > highScore) {
      highScore = score;
      highScoreEl.textContent = highScore;
    }
  } else {
    score--;
    scoreEl.textContent = score;

    if (guessInput > randomResult) {
      messageOutput.textContent = 'Too High';
    } else {
      messageOutput.textContent = 'Too Low';
    }
  }
};

const playAgain = function () {
  score = 20;
  randomResult = randomNumberGenerator();
  correctNumber.textContent = String('?');
  document.querySelector('.guess').value = '';
  scoreEl.textContent = score;
  messageOutput.textContent = 'Start guessing...';
  body.style.backgroundColor = ' #222';
};

checkNumberBtn.addEventListener('click', enteredNumber);
againBtn.addEventListener('click', playAgain);
