const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");

    if (gameBoard[index] === "" && gameActive) {
      gameBoard[index] = currentPlayer;
      cell.textContent = currentPlayer;
      checkWinner();
      switchPlayer();
    }
  });
});

function switchPlayer() {
  if (!gameActive) return;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      statusText.textContent = `Player ${gameBoard[a]} Wins!`;
      gameActive = false;
      return;
    }
  }

  if (!gameBoard.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
  }
}

function restartGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = "Player X's Turn";
  cells.forEach(cell => cell.textContent = "");
}
