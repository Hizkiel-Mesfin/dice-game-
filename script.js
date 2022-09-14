"use strict";

//selecting elements
const playerOne = document.querySelector(".player-1");
const playerTwo = document.querySelector(".player-2");

const scoreOne = document.querySelector(".score-1");
const scoreTwo = document.querySelector(".score-2");

const currentScoreOne = document.querySelector(".current-score-1");
const currentScoreTwo = document.querySelector(".current-score-2");

const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnAdd = document.querySelector(".btn-add");

const diceImg = document.querySelector(".dice-img");

const winnerOne = document.querySelector(".winner-1");
const winnerTwo = document.querySelector(".winner-2");

//Initial state

scoreOne.textContent = 0;
scoreTwo.textContent = 0;
diceImg.classList.add("hidden");
winnerOne.classList.add("hidden");
winnerTwo.classList.add("hidden");

//variables

let currentCounter = 0;
let activePlayer = 1;
let scoreAcc = [0, 0, 0];
let playGoesOn = true;

//functions

const switchPlayer = () => {
  currentCounter = 0;
  document.querySelector(`.current-score-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;

  playerOne.classList.toggle("players-turn");
  playerTwo.classList.toggle("players-turn");
};

const init = () => {
  diceImg.classList.add("hidden");

  document.querySelector(`.player-${activePlayer}`).classList.remove("black");
  currentCounter = 0;
  activePlayer = 1;
  scoreAcc = [0, 0, 0];
  playGoesOn = true;
  playerOne.classList.remove("players-turn");
  playerTwo.classList.add("players-turn");
  scoreOne.textContent = 0;
  scoreTwo.textContent = 0;
  currentScoreOne.textContent = 0;
  currentScoreTwo.textContent = 0;

  winnerOne.classList.add("hidden");
  winnerTwo.classList.add("hidden");
};

btnRoll.addEventListener("click", function () {
  if (playGoesOn) {
    const randomNum = Math.ceil(Math.random() * 6);
    diceImg.classList.remove("hidden");
    diceImg.src = `img/dice-${randomNum}.png`;

    if (randomNum !== 1) {
      currentCounter += randomNum;
      document.querySelector(`.current-score-${activePlayer}`).textContent =
        currentCounter;
    } else {
      switchPlayer();
    }
  }
});

btnAdd.addEventListener("click", function () {
  if (playGoesOn) {
    scoreAcc[activePlayer] += currentCounter;

    document.querySelector(`.score-${activePlayer}`).textContent =
      scoreAcc[activePlayer];

    if (scoreAcc[activePlayer] >= 100) {
      document.querySelector(`.player-${activePlayer}`).classList.add("black");
      diceImg.classList.add("hidden");
      playGoesOn = false;

      document
        .querySelector(`.winner-${activePlayer}`)
        .classList.remove("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
