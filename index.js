let board = document.getElementById("board");
let message = document.getElementById("message");
let restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let boardState = Array(9).fill(null);

let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return boardState[a];
    }
  }
  return boardState.includes(null) ? null : "Tie";
}

function handleCellClick(event) {
  let cell = event.target;
  let index = cell.dataset.index;

  if (boardState[index] || !gameActive) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  let winner = checkWinner();

  if (winner) {
    gameActive = false;
    message.textContent = winner === "Tie" ? "It's a Tie!" : `${winner} Wins!`;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}\'s Turn`;
  }
}

function restartGame() {
  boardState.fill(null);
  currentPlayer = "X";
  gameActive = true;
  message.textContent = `Player ${currentPlayer}\'s Turn`;
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

board.addEventListener("click", handleCellClick);
restartBtn.addEventListener("click", restartGame);

message.textContent = `Player ${currentPlayer}\'s Turn`;
