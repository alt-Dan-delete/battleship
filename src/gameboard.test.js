const Gameboard = require('./gameboard');
const Ship = require('./ship');

test('gameboard exists', () => {
  const board = Gameboard();
  expect(board).toBeTruthy();
});

test('board has 10 rows', () => {
  const board = Gameboard();
  expect(board.grid().length).toBe(10);
});

test('board has 10 columns', () => {
  const board = Gameboard();
  expect(board.grid()[0].length).toBe(10);
});

test('ship placement', () => {
  const board = Gameboard();
  const myShip = Ship(2);
  
  board.placeShip(myShip, 0, 5, 'vertical');
  expect(board.grid()[5][0]).toBe(myShip)
  expect(board.grid()[6][0]).toBe(myShip)  
});

test('receiveAttack hits a ship', () => {
  const board = Gameboard();
  const myShip = Ship(2);
  board.placeShip(myShip, 0, 5, 'vertical');
  
  board.receiveAttack(0, 5);
  board.receiveAttack(0, 6);
  
  expect(myShip.getHits()).toBe(2);
});