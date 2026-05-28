const Player = require("./player");
const Ship = require("./ship");
const UI = require("./ui")

let isGameOver = false;
let canPlayerMove = false;

const user = Player("Human");
const computer = Player("AI");

user.placeFleet();
computer.placeFleet();


const playerBoardUI = document.getElementById('player-board');
const computerBoardUI = document.getElementById('computer-board');

UI.randomBtn.addEventListener('click', () => {
    user.board.clearGrid();
    computer.board.clearGrid();
    isGameOver = false;
    canPlayerMove = false;
    user.placeFleet();
    computer.placeFleet();
    renderBoard(user, playerBoardUI, false);
    renderBoard(computer, computerBoardUI, true);
    UI.message.textContent = 'Press start to play'
    UI.message.hidden = false;
})

UI.playBtn.addEventListener('click', () => {
    canPlayerMove = true;
    UI.message.hidden = true;
})


renderBoard(user, playerBoardUI, false);
renderBoard(computer, computerBoardUI, true);

function handleAttack(x, y) {
    if (isGameOver || !canPlayerMove) return;

    const hit = user.attack(computer.board, x, y);   
    if (!hit) return; 

    renderBoard(computer, computerBoardUI, true);

    if (computer.board.allSunk()) {
        isGameOver = true;
        UI.message.textContent = "You Win! Press random to start a new game!"
        UI.message.hidden = false;    
        return;
    }

    canPlayerMove = false;

    setTimeout(() => {
        computer.computerMove(user.board);
        renderBoard(user, playerBoardUI, false);

        if (user.board.allSunk()) {
            isGameOver = true;
            UI.message.textContent = "You Loose! Press random to start a new game!"
            UI.message.hidden = false;            
        }
        
        canPlayerMove = true;
    }, 500);
}


function renderBoard(boardInstance, containerElement, isEnemy) {
    containerElement.innerHTML = '';
    let grid = boardInstance.board.grid();

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const square = document.createElement('div');
            square.classList.add('square');

            const cell = grid[y][x];
            if (cell === 'miss') {
                square.classList.add('miss');
            } else if (cell === 'hit') {
                square.classList.add('hit');
            } else if (cell !== null && !isEnemy) {
                const shipName = cell.getName();
                square.classList.add('ship', shipName);
            }

            if (isEnemy) {
                square.addEventListener('click', () => handleAttack(x, y));
            }

            containerElement.appendChild(square);
        }
    }
}