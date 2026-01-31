const boardElement = document.getElementById("board");
const statusDisplay = document.querySelector("#status");
const resetBtn = document.getElementById("resetBtn");
const cells = document.querySelectorAll(".cell");

let gameActive = true;
let currentPlayer = "x";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (gameState[clickedCellIndex] !== "" || !gameActive) return;

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.classList.add(currentPlayer);
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === "" || b === "" || c === "") continue;
    if (a === b && b === c) {
      roundWon = true;
      // Highlight winning cells
      winCondition.forEach((index) => cells[index].classList.add("winner"));
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = `Player <span>${currentPlayer.toUpperCase()}</span> Has Won!`;
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = "Game Ended in a Draw!";
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "x" ? "o" : "x";
  statusDisplay.innerHTML = `Player <span>${currentPlayer.toUpperCase()}</span>'s Turn`;
}

function restartGame() {
  gameActive = true;
  currentPlayer = "x";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = `Player <span>X</span>'s Turn`;
  cells.forEach((cell) => {
    cell.classList.remove("x", "o", "winner");
  });
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", restartGame);
statusDisplay.innerHTML = `Player <span>X</span>'s Turn`;
