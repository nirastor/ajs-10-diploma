import { calcTileType, randomizeArray, getStartPosition } from '../utils';

test.each([
  [0, 8, 'top-left'],
  [1, 8, 'top'],
  [3, 8, 'top'],
  [6, 8, 'top'],
  [7, 8, 'top-right'],
  [8, 8, 'left'],
  [15, 8, 'right'],
  [24, 8, 'left'],
  [27, 8, 'center'],
  [47, 8, 'right'],
  [48, 8, 'left'],
  [55, 8, 'right'],
  [56, 8, 'bottom-left'],
  [57, 8, 'bottom'],
  [59, 8, 'bottom'],
  [62, 8, 'bottom'],
  [63, 8, 'bottom-right'],
])(
  ('Should return string name of border-type for 8*8 field'), (index, fieldSize, name) => {
    expect(calcTileType(index, fieldSize)).toBe(name);
  },
);

test.each([
  [0, 2, 'top-left'],
  [1, 2, 'top-right'],
  [2, 2, 'bottom-left'],
  [3, 2, 'bottom-right'],
])(
  ('Should return string name of border-type for extreamly small 2*2 field'), (index, fieldSize, name) => {
    expect(calcTileType(index, fieldSize)).toBe(name);
  },
);

test('RandomizeArray should not break array', () => {
  const expected = [1, 2, 3, 4];
  const recived = randomizeArray([4, 3, 2, 1]).sort();

  expect(recived).toEqual(expected);
});

test('getStartPosition should return correct start position for 8*8 field for gamer', () => {
  const expected = [0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57];
  const recived = getStartPosition(8, 'gamer').sort((a, b) => a - b);
  expect(recived).toEqual(expected);
});

test('getStartPosition should return correct start position for 8*8 field for computer', () => {
  const expected = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
  const recived = getStartPosition(8, 'computer').sort((a, b) => a - b);
  expect(recived).toEqual(expected);
});

test('getStartPosition should throw error if fieldSize < 4', () => {
  expect(() => getStartPosition(2, 'gamer')).toThrow('Fieldsize should be grater or equal 4');
});

test('getStartPosition should throw error if fieldSize < 4', () => {
  expect(() => getStartPosition(3, 'gamer')).toThrow('Fieldsize should be grater or equal 4');
});

test('getStartPosition should not throw error if fieldSize >= 4', () => {
  expect(() => getStartPosition(4, 'gamer')).not.toThrow('Fieldsize should be grater or equal 4');
});

test('getStartPosition should throw error if fieldSize >= 4', () => {
  expect(() => getStartPosition(5, 'gamer')).not.toThrow('Fieldsize should be grater or equal 4');
});
