const cells = document.querySelectorAll(".cell");
const pointsDisplay = document.getElementById("points");
const turnsDisplay = document.getElementById("turns");
const result = document.getElementById("result");
const playAgainBtn = document.getElementById("play-again-btn");
let turn = 1;
let gameEnded = false;
let marked = new Array(10);

const gameplay = (cell, index) => {
  turn++;
  turnsDisplay.textContent = turn;
  if (turn % 2) {
    cell.textContent = "X";
  } else {
    cell.textContent = "O";
  }
  marked[index] = cell.textContent;
  gameEnded = isWinning();
  if (gameEnded) {
    const player = turn % 2 ? "Player 1" : "Player 2";
    endGame(player);
  } else if (turn === 10) {
    endGame();
  }
};

const isWinning = () => {
  if (
    (marked[1] && marked[1] === marked[2] && marked[2] === marked[3]) ||
    (marked[4] && marked[4] === marked[5] && marked[5] === marked[6]) ||
    (marked[7] && marked[7] === marked[8] && marked[8] === marked[9])
  ) {
    return true;
  }
  if (
    (marked[1] && marked[1] === marked[4] && marked[4] === marked[7]) ||
    (marked[2] && marked[2] === marked[5] && marked[5] === marked[8]) ||
    (marked[3] && marked[3] === marked[6] && marked[6] === marked[9])
  ) {
    return true;
  }
  if (
    (marked[1] && marked[1] === marked[5] && marked[5] === marked[9]) ||
    (marked[3] && marked[3] === marked[5] && marked[5] === marked[7])
  ) {
    return true;
  }
  return false;
};

const endGame = (player = false) => {
  result.parentElement.style.display = "block";
  if (player) {
    result.textContent = `${player} WIN!!!`;
  } else {
    result.textContent = `DRAW!!`;
  }
};

playAgainBtn.addEventListener("click", () => {
  result.parentElement.style.display = "none";
  marked = new Array(10);
  turn = 1;
  turnsDisplay.textContent = turn;
  cells.forEach((cell) => {
    cell.textContent = "";
  });
});

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!cell.textContent && !gameEnded) {
      const index = cell.classList[1].slice(5, 6);
      gameplay(cell, index);
    } else {
      alert("Invalid move!! Try again");
    }
  });
});
