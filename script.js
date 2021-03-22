'use strict';

//////////////////////
// Selecting elements
//////////////////////
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // way 1 to select an element by ID
const score1El = document.getElementById('score--1'); // way 2 to select an element by ID
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//////////////////////
// Starting conditions
//////////////////////

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; // state variable

  // Reset score and dice
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  // Reset current score
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Remove winner class
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // Remove active class
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0; // set original player's score back to 0 before switching

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//////////////////////
// Roll the dice
//////////////////////

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    console.log(dice);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore; // building ID names dynamically based on who is the active player right now
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

//////////////////////
// Hold current score
//////////////////////

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score (score--0 or score--1)
    scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore;
    console.log(scores[activePlayer]);

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden'); // hide the dice image
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

//////////////////////
// Play again / Reset game
//////////////////////

btnNew.addEventListener('click', init);
