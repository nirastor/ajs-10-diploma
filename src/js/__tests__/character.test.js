/* eslint-disable no-unused-vars */
import Character from '../Character';

test('Should throw error new Character not allowed', () => {
  expect(() => { const t = new Character(1, 'test'); })
    .toThrow('Character is basic class. new Character not allowed');
});
