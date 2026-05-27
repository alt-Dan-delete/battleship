const Gameboard = require("./gameboard");
const Ship = require("./ship");

function Player(name) {
  const board = Gameboard();

  function computerMove(enemyBoard) {
    let success = false;
    while (!success) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      
      success = enemyBoard.receiveAttack(x, y);
    }
  }
  
  function attack(enemyBoard, x, y) {
    return enemyBoard.receiveAttack(x, y);
  }

  function placeOnBoard(shipConfig) {
    let placement = false;
    while (!placement) {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      let orientation = Math.floor(Math.random() * 2) > 0 ? 'horizontal' : 'vertical';
      const newShip = Ship(shipConfig.length, shipConfig.name);
      placement = board.placeShip(newShip, x, y, orientation)
    }
  }

  function placeFleet() {
    const fleet = [
      { length: 5, name: 'carrier' },
      { length: 4, name: 'battleship' },
      { length: 3, name: 'destroyer' },
      { length: 2, name: 'submarine' },
      { length: 1, name: 'patrol-boat' }
    ];
    fleet.forEach(element => {
      placeOnBoard(element)
    });    
  }

  return {
    name,
    board,
    attack,
    computerMove,
    placeOnBoard,
    placeFleet
  };
}

module.exports = Player;