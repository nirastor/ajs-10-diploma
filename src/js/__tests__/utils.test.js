import {
  calcTileType,
  randomizeArray,
  getStartPosition,
  getDistance,
  getPositionByCoordinates,
  getCoordinatesByPosition,
} from '../utils';

/*
// calcTileType
*/

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

/*
// RandomizeArray
*/

test('RandomizeArray should not break array', () => {
  const expected = [1, 2, 3, 4];
  const recived = randomizeArray([4, 3, 2, 1]).sort();

  expect(recived).toEqual(expected);
});

/*
// getStartPosition
*/

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

/*
// getDistance
*/

test.each([
  [8, 0, 1],
  [8, 0, 2],
  [8, 0, 3],
  [8, 0, 7],
  [8, 16, 22],
  [8, 56, 57],
  [8, 56, 60],
  [8, 56, 63],
])('should return inline: true for cells in a row', (fz, el1, el2) => {
  expect(getDistance(fz, el1, el2).inLine).toBe(true);
});

test.each([
  [8, 0, 10],
  [8, 0, 11],
  [8, 0, 15],
  [8, 16, 26],
  [8, 16, 31],
  [8, 56, 50],
  [8, 56, 53],
  [8, 56, 55],
])('should return inline: false for cells not in row', (fz, el1, el2) => {
  expect(getDistance(fz, el1, el2).inLine).toBe(false);
});

test.each([
  [8, 0, 8],
  [8, 0, 16],
  [8, 0, 56],
  [8, 0, 32],
  [8, 1, 9],
  [8, 7, 15],
  [8, 7, 23],
  [8, 7, 63],
])('should return inline: true for cells in a col', (fz, el1, el2) => {
  expect(getDistance(fz, el1, el2).inLine).toBe(true);
});

test.each([
  [8, 0, 17],
  [8, 0, 33],
  [8, 0, 57],
  [8, 1, 18],
  [8, 1, 50],
  [8, 7, 22],
  [8, 7, 61],
])('should return inline: false for cells not in col', (fz, el1, el2) => {
  expect(getDistance(fz, el1, el2).inLine).toBe(false);
});

test.each([
  [8, 0, 9],
  [8, 0, 18],
  [8, 0, 63],
  [8, 1, 8],
  [8, 1, 10],
  [8, 1, 46],
  [8, 35, 26],
  [8, 35, 28],
  [8, 35, 42],
  [8, 35, 8],
  [8, 35, 62],
  [8, 35, 56],
  [8, 35, 7],
])('should return inline: true for any diagonal lines', (fz, el1, el2) => {
  expect(getDistance(fz, el1, el2).inLine).toBe(true);
});

test.each([
  [8, 0, 1, 1],
  [8, 0, 2, 2],
  [8, 0, 7, 7],
  [8, 9, 3, 2],
  [8, 9, 12, 3],
  [8, 9, 19, 2],
  [8, 35, 0, 4],
  [8, 35, 3, 4],
  [8, 35, 7, 4],
  [8, 35, 63, 4],
  [8, 35, 36, 1],
  [8, 35, 42, 1],
  [8, 35, 40, 3],
])('should count correct distance', (fz, el1, el2, result) => {
  expect(getDistance(fz, el1, el2).distance).toBe(result);
});

test.each([
  [1, 1, 8, 0],
  [1, 8, 8, 7],
  [8, 1, 8, 56],
  [8, 8, 8, 63],
  [1, 4, 8, 3],
  [4, 5, 8, 28],
  [6, 8, 8, 47],
  [8, 2, 8, 57],
])('should convert row, col and fieldSize to index', (row, col, fieldSize, result) => {
  expect(getPositionByCoordinates(row, col, fieldSize)).toBe(result);
});

test.each([
  [0, 8, [1, 1]],
])('shuld convert index and fieldSize to row and col', (index, fieldSize, result) => {
  expect(getCoordinatesByPosition(index, fieldSize)[0]).toBe(result[0]);
  expect(getCoordinatesByPosition(index, fieldSize)[1]).toBe(result[1]);
});
