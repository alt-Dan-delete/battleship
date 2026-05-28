const Ship = require('./ship');

test('ship is not sunk initially', () => {
  const ship = Ship(3);
  expect(ship.isSunk()).toBe(false);
});

test('ship sinks after enough hits', () => {
  const ship = Ship(2);

  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});

