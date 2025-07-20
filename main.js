'use strict';

// Selecting score and current score elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

// Selecting player sections
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Selecting buttons and dice
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initial game values
let currentScore, scores, activePlayer, playing;

function init() {
  currentScore = 0;
  scores = [0, 0];                                                               
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

 dice.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
}

init();

// Function to switch players
function switchPlayer() {
  document.getElementById('current--${activePlayer}').textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Roll Dice Button Logic
btnRoll.addEventListener('click', function () {
  if (!playing) return;

  const diceRoll = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  dice.src = `dice-${diceRoll}.png`;

  if (diceRoll !== 1) {
    currentScore += diceRoll;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

// Hold Button Logic
btnHold.addEventListener('click', function () {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    dice.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    alert(`🎉 Player ${activePlayer} wins!`);
  } else {
    switchPlayer();
  }
});

// New Game Button Logic
btnNew.addEventListener('click', init);