/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { characterGenerator } from './generators';
import PositionedCharacter from './PositionedCharacter';
import { randomizeArray, getStartPosition } from './utils';
import {
  Bowman,
  Swordsman,
  Magician,
  Vampire,
  Undead,
  Daemon,
} from './Character';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.field = [];
  }

  init() {
    this.gamePlay.drawUi('prairie');

    // TODO: load saved stated from stateService

    // Event listeners to gamePlay events
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this));

    // tmp move to newGame
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    const findPers = this.field.find((item) => item.position === index);
    if (findPers) {
      const pers = findPers.character;
      const message = `🎖${pers.level} ⚔${pers.attack} 🛡${pers.defence} ❤${pers.health}`;
      this.gamePlay.showCellTooltip(message, index);
    }
  }

  onCellLeave(index) {
    // Strange but hideCellTooltip work without onCellLeave
  }

  onNewGameClick() {
    const gamerPositions = randomizeArray(getStartPosition(this.gamePlay.boardSize, 'gamer'));
    const computerPositions = randomizeArray(getStartPosition(this.gamePlay.boardSize, 'computer'));

    for (let i = 0; i < 2; i += 1) {
      const gamerPers = characterGenerator([Bowman, Swordsman, Magician], 1);
      this.field.push(new PositionedCharacter(gamerPers, gamerPositions[i]));

      const computerPers = characterGenerator([Vampire, Undead, Daemon], 1);
      this.field.push(new PositionedCharacter(computerPers, computerPositions[i]));
    }

    this.gamePlay.redrawPositions(this.field);
  }
}
