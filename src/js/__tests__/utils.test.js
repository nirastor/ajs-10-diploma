import { calcTileType } from '../utils';

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
