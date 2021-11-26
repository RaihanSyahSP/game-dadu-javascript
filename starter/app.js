/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- Player win when he got double six
*/

var scores, roundScore, activePlayer, gamePlaying, currentRoll;

init();

var lastDice;

let tombolRoll = document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display th result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";

    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    // 3. Update the round score IF the rolled number was NOT 1
    if (dice1 == 6 && dice2 == 6) {
      winner();
      document.querySelector("#current-" + activePlayer).textContent = "You Got Double Six!";
    } else if (dice1 !== 1 && dice2 !== 1) {
      // add score
      roundScore += dice1 + dice2;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
      if (currentRoll == 0) {
        nextPlayer();
        return (currentRoll = 3);
      } else {
        currentRoll--;
      }
      console.log(currentRoll);
      document.querySelector("#chances").value = currentRoll;
    } else {
      // next player
      nextPlayer();
      currentRoll = 3;
      document.querySelector("#chances").value = currentRoll;
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // ADD CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore;

    // undefined, 0, null or "" are COERCED to FALSE
    // anything else is COERCED to TRUE
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // check if player WON the game
    if (scores[activePlayer] >= winningScore) {
      winner();
    } else {
      // next player
      nextPlayer();
    }
  }
});

function winner() {
  document.querySelector("#name-" + activePlayer).textContent = "Winner!";
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
  document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
  document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
  gamePlaying = false;
}

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  currentRoll = 3;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  currentRoll = 3;

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player-1";
  document.getElementById("name-1").textContent = "Player-2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
