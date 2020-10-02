/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { characterGenerator } from './generators';
import GameState from './GameState';
import GamePlay from './GamePlay';
import PositionedCharacter from './PositionedCharacter';
import { randomizeArray, getStartPosition, getDistance } from './utils';
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
    this.gameState = new GameState();
    this.GAMER_CLASSES = [Bowman, Swordsman, Magician];
    this.COMPUTER_CLASSES = [Vampire, Undead, Daemon];
  }

  init() {
    // draw field
    this.gamePlay.drawUi('prairie');

    // TODO: load saved stated from stateService

    // init event listeners to gamePlay events
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  onCellClick(index) {
    const findedPers = this.gameState.field.find((item) => item.position === index);
    if (!findedPers || this.gameState.activePlayer === 'computer') {
      return false;
    }

    const constructorName = Object.getPrototypeOf(findedPers.character).constructor;
    if (!this.GAMER_CLASSES.includes(constructorName)) {
      GamePlay.showError('Выбрать можно только своих');
      return false;
    }

    // if everything is ok, do select action
    // переделать через класс спозиционированный герой
    const selectedPosition = this.gameState.selected ? this.gameState.selected.position : null;
    if (selectedPosition === index) {
      this.gamePlay.deselectCell(index);
      this.gameState.selected = null;
    } else if (selectedPosition === null) {
      this.gamePlay.selectCell(index);
      this.gameState.selected = findedPers;
    } else {
      this.gamePlay.deselectCell(selectedPosition);
      this.gamePlay.selectCell(index);
      this.gameState.selected = findedPers;
    }
  }

  onCellEnter(index) {
    const isPersOnCell = this.gameState.field.find((item) => item.position === index);

    // is any pers on index?
    if (isPersOnCell) {
      const pers = isPersOnCell.character;
      const whoIsOnField = Object.getPrototypeOf(pers).constructor;

      // if any --> show tooltip
      const message = `🎖${pers.level} ⚔${pers.attack} 🛡${pers.defence} ❤${pers.health}`;
      this.gamePlay.showCellTooltip(message, index);

      // is it gamer or computer? if gamer --> can select
      if (this.GAMER_CLASSES.includes(whoIsOnField)) {
        this.gamePlay.setCursor('pointer');
      } else {
        // if computer --> by default not allowed
        this.gamePlay.setCursor('not-allowed');

        // if copmuter and your have selecetd pers and enough attackRange --> can fire
        if (this.gameState.selected) {
          const { attackRange } = this.gameState.selected.character;
          const { position } = this.gameState.selected;
          if (getDistance(this.gamePlay.boardSize, position, index).distance <= attackRange) {
            this.gamePlay.setCursor('crosshair');
            this.gamePlay.selectCell(index, 'red');
          }
        }
      }

    // if no characters on index and you have selected pers and enough moveRange --> can go
    } else if (this.gameState.selected) {
      const { moveRange } = this.gameState.selected.character;
      const { position } = this.gameState.selected;
      if (getDistance(this.gamePlay.boardSize, position, index).distance <= moveRange) {
        this.gamePlay.setCursor('pointer');
        this.gamePlay.selectCell(index, 'green');

      // else not allowed
      } else {
        this.gamePlay.setCursor('not-allowed');
      }
    }
  }

  onCellLeave(index) {
    // Strange but hideCellTooltip work without onCellLeave
    this.gamePlay.setCursor('auto');
    this.gamePlay.deselectCell(index);
    if (this.gameState.selected) {
      this.gamePlay.selectCell(this.gameState.selected.position);
    }
  }

  onNewGameClick() {
    // reset gameState
    this.gameState.field = [];
    this.gameState.activePlayer = 'gamer';
    if (this.gameState.selected) {
      this.gamePlay.deselectCell(this.gameState.selected.position);
    }
    this.gameState.selected = null;

    // create new start
    const gamerPositions = randomizeArray(getStartPosition(this.gamePlay.boardSize, 'gamer'));
    const computerPositions = randomizeArray(getStartPosition(this.gamePlay.boardSize, 'computer'));

    for (let i = 0; i < 2; i += 1) {
      const gamerPers = characterGenerator(this.GAMER_CLASSES, 1);
      this.gameState.field.push(new PositionedCharacter(gamerPers, gamerPositions[i]));

      const computerPers = characterGenerator(this.COMPUTER_CLASSES, 1);
      this.gameState.field.push(new PositionedCharacter(computerPers, computerPositions[i]));
    }

    this.gamePlay.redrawPositions(this.gameState.field);
  }
}
