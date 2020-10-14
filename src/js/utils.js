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

export function randomizeArray(arr) {
  const randomArr = arr.slice();
  for (let i = randomArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomArr[i], randomArr[j]] = [randomArr[j], randomArr[i]];
  }

  return randomArr;
}

export function getStartPosition(fieldSize, who) {
  const positions = [];

  if (fieldSize < 4) {
    throw new Error('Fieldsize should be grater or equal 4');
  }

  for (let i = 0; i < fieldSize ** 2; i += 1) {
    if ((i % fieldSize === 0 || i % fieldSize === 1) && who === 'gamer') {
      positions.push(i);
    }

    if ((i % fieldSize === fieldSize - 1 || i % fieldSize === fieldSize - 2) && who === 'computer') {
      positions.push(i);
    }
  }

  return positions;
}

export function getCoordinatesByPosition(index, fieldSize) {
  const row = Math.floor(index / fieldSize) + 1;
  const col = Math.floor(index % fieldSize) + 1;
  return [row, col];
}

export function getPositionByCoordinates(row, col, fieldSize) {
  return fieldSize * (row - 1) + (col - 1);
}

export function getDistance(fieldSize, cell1, cell2) {
  const [row1, col1] = getCoordinatesByPosition(cell1, fieldSize);
  const [row2, col2] = getCoordinatesByPosition(cell2, fieldSize);

  let inLine = false;
  if (row1 === row2 || col1 === col2 || Math.abs(row1 - row2) === Math.abs(col1 - col2)) {
    inLine = true;
  }

  const distance = Math.max(Math.abs(row1 - row2), Math.abs(col1 - col2));

  return { inLine, distance };
}

export function isGamer(personOnCell, gamerClasses) {
  const whoIsOnField = Object.getPrototypeOf(personOnCell.character).constructor;
  return gamerClasses.includes(whoIsOnField);
}

export function countDamage(attacker, target) {
  // Сandidate to cashing
  const attackerAttack = attacker.character.attack;
  return Math.max(attackerAttack - target.character.defence, attackerAttack * 0.1);
}
