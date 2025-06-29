const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartBtn');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0 };

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  if (!gameActive) return;

  cell.textContent = currentPlayer === 'X' ? '❌' : '⭕';

  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer === 'X' ? '❌' : '⭕'} wins!`;
    scores[currentPlayer]++;
    updateScore();
    highlightWin(currentPlayer);
    gameActive = false;
  } else if (isDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer === 'X' ? '❌' : '⭕'}'s turn`;
}

function checkWin(player) {
  return winPatterns.some(pattern => {
    return pattern.every(index => cells[index].textContent === (player === 'X' ? '❌' : '⭕'));
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function updateScore() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

function highlightWin(player) {
  winPatterns.forEach(pattern => {
    if (pattern.every(index => cells[index].textContent === (player === 'X' ? '❌' : '⭕'))) {
      pattern.forEach(index => {
        cells[index].style.backgroundColor = '#b8f1b0';
      });
    }
  });
}

restartButton.addEventListener('click', () => {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = 'white';
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = "Player ❌'s turn";
});
