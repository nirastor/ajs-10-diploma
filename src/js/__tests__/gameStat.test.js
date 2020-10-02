import GameState from '../GameState';

test('should change player from gamer to computer', () => {
  const recieved = new GameState();
  recieved.activePlayer = 'gamer';
  recieved.changeActivePlayer();
  expect(recieved.activePlayer).toBe('computer');
});

test('should change player from computer to gamer', () => {
  const recieved = new GameState();
  recieved.activePlayer = 'computer';
  recieved.changeActivePlayer();
  expect(recieved.activePlayer).toBe('gamer');
});

test('should change player from null to gamer', () => {
  const recieved = new GameState();
  recieved.changeActivePlayer();
  expect(recieved.activePlayer).toBe('gamer');
});
