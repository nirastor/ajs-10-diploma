export function calcTileType(index, boardSize) {
  let borderType = '';

  if (index === 0) {
    borderType = 'top-left';
  } else if (index === boardSize - 1) {
    borderType = 'top-right';
  } else if (index === boardSize ** 2 - boardSize) {
    borderType = 'bottom-left';
  } else if (index === boardSize ** 2 - 1) {
    borderType = 'bottom-right';
  } else if (index < boardSize) {
    borderType = 'top';
  } else if (index > boardSize ** 2 - boardSize) {
    borderType = 'bottom';
  } else if (index % boardSize === 0) {
    borderType = 'left';
  } else if ((index + 1) % boardSize === 0) {
    borderType = 'right';
  } else {
    borderType = 'center';
  }

  return borderType;
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
