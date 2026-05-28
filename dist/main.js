/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js"
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\r\n\r\nfunction Gameboard() {\r\n  let grid = [];\r\n  let placedShips = [];\r\n\r\n  for (let i = 0; i < 10; i++) {\r\n    const row = [];\r\n    for (let k = 0; k < 10; k++) {\r\n      row.push(null);\r\n    }\r\n    grid.push(row);\r\n  }\r\n\r\n  return {\r\n    placeShip(shipInstance, x, y, orientation) {\r\n      if (this.isPlacementValid(shipInstance, x, y, orientation)) {\r\n        for (let i = 0; i < shipInstance.getLength(); i++) {\r\n          if (orientation === 'horizontal') {\r\n            grid[y][x + i] = shipInstance;\r\n          }\r\n          else {\r\n            grid[y + i][x] = shipInstance;\r\n          }\r\n        }\r\n        placedShips.push(shipInstance);\r\n        return true;\r\n      }\r\n      else {\r\n        return false;\r\n      }\r\n    },\r\n    isPlacementValid(shipInstance, x, y, orientation) {\r\n      if (orientation === 'horizontal') {\r\n        if ((shipInstance.getLength() + x) > 10) {\r\n          return false;\r\n        }\r\n        for (let i = 0; i < shipInstance.getLength(); i++) {\r\n          if (grid[y][x + i] !== null) {\r\n            return false\r\n          }\r\n        }\r\n        return true;\r\n      }\r\n      else if (orientation === 'vertical') {\r\n        if ((shipInstance.getLength() + y) > 10) {\r\n          return false;\r\n        }\r\n\r\n        for (let i = 0; i < shipInstance.getLength(); i++) {\r\n          if (grid[y + i][x] !== null) {\r\n            return false\r\n          }\r\n        }\r\n        return true;\r\n      }\r\n    },\r\n    receiveAttack(x, y) {\r\n      const target = grid[y][x];\r\n      if (target === 'miss' || target === 'hit') {\r\n        return false;\r\n      }\r\n\r\n      if (target === null) {\r\n        grid[y][x] = 'miss';\r\n        return true;\r\n      }\r\n      target.hit();\r\n      grid[y][x] = 'hit';\r\n      return true;\r\n    },\r\n    grid() {\r\n      return grid;\r\n    },\r\n    allSunk() {\r\n      for (let i = 0; i < placedShips.length; i++) {\r\n        const ship = placedShips[i];\r\n        if (ship.isSunk() === false) {\r\n          return false;\r\n        }\r\n      }\r\n      return true;\r\n    },\r\n    placedShips() {\r\n      return placedShips;\r\n    },\r\n    clearGrid() {\r\n      grid = [];\r\n      for (let i = 0; i < 10; i++) {\r\n        const row = [];\r\n        for (let k = 0; k < 10; k++) {\r\n          row.push(null);\r\n        }\r\n        grid.push(row);\r\n      }\r\n      placedShips = [];\r\n    }\r\n  };\r\n}\r\n\r\nmodule.exports = Gameboard;\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?\n}");

/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("{const Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\r\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\r\nconst UI = __webpack_require__(/*! ./ui */ \"./src/ui.js\")\r\n\r\nlet isGameOver = false;\r\nlet canPlayerMove = false;\r\n\r\nconst user = Player(\"Human\");\r\nconst computer = Player(\"AI\");\r\n\r\nuser.placeFleet();\r\ncomputer.placeFleet();\r\n\r\n\r\nconst playerBoardUI = document.getElementById('player-board');\r\nconst computerBoardUI = document.getElementById('computer-board');\r\n\r\nUI.randomBtn.addEventListener('click', () => {\r\n    user.board.clearGrid();\r\n    computer.board.clearGrid();\r\n    isGameOver = false;\r\n    canPlayerMove = false;\r\n    user.placeFleet();\r\n    computer.placeFleet();\r\n    renderBoard(user, playerBoardUI, false);\r\n    renderBoard(computer, computerBoardUI, true);\r\n    UI.message.textContent = 'Press start to play'\r\n    UI.message.hidden = false;\r\n})\r\n\r\nUI.playBtn.addEventListener('click', () => {\r\n    canPlayerMove = true;\r\n    UI.message.hidden = true;\r\n})\r\n\r\n\r\nrenderBoard(user, playerBoardUI, false);\r\nrenderBoard(computer, computerBoardUI, true);\r\n\r\nfunction handleAttack(x, y) {\r\n    if (isGameOver || !canPlayerMove) return;\r\n\r\n    const hit = user.attack(computer.board, x, y);   \r\n    if (!hit) return; \r\n\r\n    renderBoard(computer, computerBoardUI, true);\r\n\r\n    if (computer.board.allSunk()) {\r\n        isGameOver = true;\r\n        UI.message.textContent = \"You Win! Press random to start a new game!\"\r\n        UI.message.hidden = false;    \r\n        return;\r\n    }\r\n\r\n    canPlayerMove = false;\r\n\r\n    setTimeout(() => {\r\n        computer.computerMove(user.board);\r\n        renderBoard(user, playerBoardUI, false);\r\n\r\n        if (user.board.allSunk()) {\r\n            isGameOver = true;\r\n            UI.message.textContent = \"You Loose! Press random to start a new game!\"\r\n            UI.message.hidden = false;            \r\n        }\r\n        \r\n        canPlayerMove = true;\r\n    }, 500);\r\n}\r\n\r\n\r\nfunction renderBoard(boardInstance, containerElement, isEnemy) {\r\n    containerElement.innerHTML = '';\r\n    let grid = boardInstance.board.grid();\r\n\r\n    for (let y = 0; y < 10; y++) {\r\n        for (let x = 0; x < 10; x++) {\r\n            const square = document.createElement('div');\r\n            square.classList.add('square');\r\n\r\n            const cell = grid[y][x];\r\n            if (cell === 'miss') {\r\n                square.classList.add('miss');\r\n            } else if (cell === 'hit') {\r\n                square.classList.add('hit');\r\n            } else if (cell !== null && !isEnemy) {\r\n                const shipName = cell.getName();\r\n                square.classList.add('ship', shipName);\r\n            }\r\n\r\n            if (isEnemy) {\r\n                square.addEventListener('click', () => handleAttack(x, y));\r\n            }\r\n\r\n            containerElement.appendChild(square);\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://battleship/./src/index.js?\n}");

/***/ },

/***/ "./src/player.js"
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{const Gameboard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\r\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\r\n\r\nfunction Player(name) {\r\n  const board = Gameboard();\r\n\r\n  function computerMove(enemyBoard) {\r\n    let success = false;\r\n    while (!success) {\r\n      const x = Math.floor(Math.random() * 10);\r\n      const y = Math.floor(Math.random() * 10);\r\n      \r\n      success = enemyBoard.receiveAttack(x, y);\r\n    }\r\n  }\r\n  \r\n  function attack(enemyBoard, x, y) {\r\n    return enemyBoard.receiveAttack(x, y);\r\n  }\r\n\r\n  function placeOnBoard(shipConfig) {\r\n    let placement = false;\r\n    while (!placement) {\r\n      let x = Math.floor(Math.random() * 10);\r\n      let y = Math.floor(Math.random() * 10);\r\n      let orientation = Math.floor(Math.random() * 2) > 0 ? 'horizontal' : 'vertical';\r\n      const newShip = Ship(shipConfig.length, shipConfig.name);\r\n      placement = board.placeShip(newShip, x, y, orientation)\r\n    }\r\n  }\r\n\r\n  function placeFleet() {\r\n    const fleet = [\r\n      { length: 5, name: 'carrier' },\r\n      { length: 4, name: 'battleship' },\r\n      { length: 3, name: 'destroyer' },\r\n      { length: 2, name: 'submarine' },\r\n      { length: 1, name: 'patrol-boat' }\r\n    ];\r\n    fleet.forEach(element => {\r\n      placeOnBoard(element)\r\n    });    \r\n  }\r\n\r\n  return {\r\n    name,\r\n    board,\r\n    attack,\r\n    computerMove,\r\n    placeOnBoard,\r\n    placeFleet\r\n  };\r\n}\r\n\r\nmodule.exports = Player;\n\n//# sourceURL=webpack://battleship/./src/player.js?\n}");

/***/ },

/***/ "./src/ship.js"
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
(module) {

eval("{function Ship(length, name) {\r\n  let hits = 0;\r\n\r\n  return {\r\n    hit() {\r\n      hits++;\r\n    },\r\n    isSunk() {\r\n      return hits >= length;\r\n    },\r\n    getLength() {\r\n      return length;\r\n    },\r\n    getName() {\r\n      return name;\r\n    },\r\n    getHits() {\r\n      return hits;\r\n    }    \r\n  };\r\n}\r\n\r\nmodule.exports = Ship;\n\n//# sourceURL=webpack://battleship/./src/ship.js?\n}");

/***/ },

/***/ "./src/ui.js"
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
(module, __unused_webpack_exports, __webpack_require__) {

eval("{const Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\r\n\r\nconst menu = document.getElementById('menu')\r\n\r\nconst message = document.createElement('h2');\r\nmessage.textContent = 'Press start to play or random to change ship placement';\r\nmenu.appendChild(message);\r\n\r\nplayBtn = document.createElement('button');\r\nplayBtn.textContent = 'play';\r\nmenu.appendChild(playBtn);\r\n\r\nconst randomBtn = document.createElement('button')\r\nrandomBtn.textContent = 'random';\r\nmenu.appendChild(randomBtn);\r\n\r\nmodule.exports = {\r\n    message,\r\n    playBtn,\r\n    randomBtn\r\n}\n\n//# sourceURL=webpack://battleship/./src/ui.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;