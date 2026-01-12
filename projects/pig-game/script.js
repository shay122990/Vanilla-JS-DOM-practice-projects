'use strict';

// Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const starterRadios = document.querySelectorAll('input[name="startingPlayer"]');

// State
let scores, currentScore, activePlayer, playing;

// -------- helpers --------
const setActiveUI = function (player) {
  player0El.classList.remove('player--active');
  player1El.classList.remove('player--active');
  document.querySelector(`.player--${player}`).classList.add('player--active');
};

const getSelectedStarter = function () {
  return Number(
    document.querySelector('input[name="startingPlayer"]:checked').value
  );
};

// -------- init --------
const initialState = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = getSelectedStarter();

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  setActiveUI(activePlayer);
};

initialState();

// -------- player switching --------
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  setActiveUI(activePlayer);
};

// -------- radio change (IMMEDIATE) --------
starterRadios.forEach((radio) => {
  radio.addEventListener('change', function () {
    activePlayer = Number(this.value);
    currentScore = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    setActiveUI(activePlayer);
  });
});

// -------- roll --------
btnRoll.addEventListener('click', function () {
  if (!playing) return;

  diceEl.classList.remove('hidden');
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

// -------- hold --------
btnHold.addEventListener('click', function () {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceEl.classList.add('hidden');
  } else {
    switchPlayer();
  }
});

// -------- new game --------
btnNew.addEventListener('click', initialState);
