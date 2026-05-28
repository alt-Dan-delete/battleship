const Player = require('./player');

test('Player exists', () => {
  const board = Player();
  expect(board).toBeTruthy();
});

test('Player has placed ships', () => {
  const user = Player();
  user.placeFleet();
  expect(user.board.placedShips().length).toBe(5);
})