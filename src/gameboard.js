const Ship = require("./ship");

function Gameboard() {
  let grid = [];
  let placedShips = [];

  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let k = 0; k < 10; k++) {
      row.push(null);
    }
    grid.push(row);
  }

  return {
    placeShip(shipInstance, x, y, orientation) {
      if (this.isPlacementValid(shipInstance, x, y, orientation)) {
        for (let i = 0; i < shipInstance.getLength(); i++) {
          if (orientation === 'horizontal') {
            grid[y][x + i] = shipInstance;
          }
          else {
            grid[y + i][x] = shipInstance;
          }
        }
        placedShips.push(shipInstance);
        return true;
      }
      else {
        return false;
      }
    },
    isPlacementValid(shipInstance, x, y, orientation) {
      if (orientation === 'horizontal') {
        if ((shipInstance.getLength() + x) > 10) {
          return false;
        }
        for (let i = 0; i < shipInstance.getLength(); i++) {
          if (grid[y][x + i] !== null) {
            return false
          }
        }
        return true;
      }
      else if (orientation === 'vertical') {
        if ((shipInstance.getLength() + y) > 10) {
          return false;
        }

        for (let i = 0; i < shipInstance.getLength(); i++) {
          if (grid[y + i][x] !== null) {
            return false
          }
        }
        return true;
      }
    },
    receiveAttack(x, y) {
      const target = grid[y][x];
      if (target === 'miss' || target === 'hit') {
        return false;
      }

      if (target === null) {
        grid[y][x] = 'miss';
        return true;
      }
      target.hit();
      grid[y][x] = 'hit';
      return true;
    },
    grid() {
      return grid;
    },
    allSunk() {
      for (let i = 0; i < placedShips.length; i++) {
        const ship = placedShips[i];
        if (ship.isSunk() === false) {
          return false;
        }
      }
      return true;
    },
    placedShips() {
      return placedShips;
    },
    clearGrid() {
      grid = [];
      for (let i = 0; i < 10; i++) {
        const row = [];
        for (let k = 0; k < 10; k++) {
          row.push(null);
        }
        grid.push(row);
      }
      placedShips = [];
    }
  };
}

module.exports = Gameboard;