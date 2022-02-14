/*
PERATURAN PERMAINAN:

- game ini terdiri dari 2 pemain
- setiap pemain memiliki score awal 0
- setiap pemain memiliki kesempatan 3 kali untuk mengambil dadu, lebih dari itu maka pemain lain yang akan bermain
- jika pemain menahan tombol hold,maka score sementara akan ditambahkan ke score keseluruhan pemain tersebut
- jika ia mendapatkan dadu no satu dalam tiga kali kesemptana, maka score sementara yang dikumpulkan akan hilang dan pemain berikutnya yang mendapatkan giliran
- pemain akan menang jika mencapai score 100 atau mencapai sesuai dengan yang diinputkan pemain di input field final score
- jika beruntung mendapatkan dua dadu no 6 maka pemain tersebut akan menang
*/

let scores, roundScore, activePlayer, gamePlaying, currentRoll;

init();


let tombolRoll = document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. random angka dadu
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. menampilkan dadu
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";

    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    // 3. Update score
    if (dice1 == 6 && dice2 == 6) {
      winner();
      document.querySelector("#current-" + activePlayer).textContent = "You Got Double Six!";
    } else if (dice1 !== 1 && dice2 !== 1) {
      // add score
      roundScore += dice1 + dice2;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
      if (currentRoll == 1) {
        nextPlayer();
        return (currentRoll = 3);
      } else {
        currentRoll--;
      }
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
    // menambahkan score sementara ke score keseluruhan
    scores[activePlayer] += roundScore;

    // Update UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    let input = document.querySelector(".final-score").value;
    currentRoll = 3;
    document.querySelector("#chances").value = currentRoll;
    let winningScore;

    // input undefined, 0, null or "" adalah FALSE
    //  selain itu akan TRUE
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // check jika pemain memenangkan permainan
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

  document.querySelector("#chances").value = currentRoll;
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
