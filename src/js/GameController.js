/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { characterGenerator } from './generators';
import GameState from './GameState';
import GamePlay from './GamePlay';
import Ai from './ai';
import PositionedCharacter from './PositionedCharacter';

import {
  randomizeArray,
  getStartPosition,
  getDistance,
  isGamer,
  countDamage,
} from './utils';

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
    this.ai = new Ai(this.GAMER_CLASSES, this.gameState, this.gamePlay.boardSize, this.gamePlay);
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
    if (this.gameState.activePlayer === 'computer') {
      return false;
    }

    // try to refacor here to switch
    if (this.gameState.avlAction === 'select') {
      this.actionSelect(index);
    } else if (this.gameState.avlAction === 'move') {
      this.actionMove(index);
    } else if (this.gameState.avlAction === 'attack') {
      this.actionAttack(index);
    } else if (this.gameState.avlAction === 'not allowed to choose') {
      GamePlay.showError('Выбрать можно только своих');
    } else if (this.gameState.avlAction === 'to far to attack') {
      GamePlay.showError('Слишком далеко для атаки');
    } else if (this.gameState.avlAction === 'to far to move') {
      GamePlay.showError('Слишком далеко для перемещения');
    }
  }

  onCellEnter(index) {
    const personOnCell = this.gameState.field.find((item) => item.position === index);

    if (personOnCell) {
      this.createAndShowTooltip(index, personOnCell);

      // try to refactor here (mininize nestin of if-s)
      // const whoIsOnField = Object.getPrototypeOf(personOnCell.character).constructor;
      // if (this.GAMER_CLASSES.includes(whoIsOnField)) {
      if (isGamer(personOnCell, this.GAMER_CLASSES)) {
        this.setAvaliableAction('select');
      } else {
        this.setAvaliableAction('not allowed to choose');

        if (this.gameState.selected) {
          this.setAvaliableAction('to far to attack');

          if (this.isActionInRange('attackRange', index)) {
            this.setAvaliableAction('attack', index);
          }
        }
      }
      return;
    }

    // if no person on target cell and you have not selected -- do nothing

    // if no person on target cell and you have selected pers -- try to move
    if (this.gameState.selected) {
      if (this.isActionInRange('moveRange', index)) {
        this.setAvaliableAction('move', index);
      } else {
        this.setAvaliableAction('to far to move');
      }
    }
  }

  isActionInRange(range, index) {
    const actionRange = this.gameState.selected.character[range];
    const { position } = this.gameState.selected;
    return getDistance(this.gamePlay.boardSize, position, index).distance <= actionRange;
  }

  setAvaliableAction(status, index = null) {
    this.gameState.avlAction = status;

    switch (status) {
      case 'select':
        this.gamePlay.setCursor('pointer');
        break;
      case 'move':
        this.gamePlay.setCursor('pointer');
        this.gamePlay.selectCell(index, 'green');
        break;
      case 'attack':
        this.gamePlay.selectCell(index, 'red');
        this.gamePlay.setCursor('crosshair');
        break;
      default:
        this.gamePlay.setCursor('not-allowed');
        break;
    }
  }

  onCellLeave(index) {
    // Strange but hideCellTooltip work without onCellLeave
    this.gamePlay.setCursor('auto');
    this.gameState.avlAction = null;
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
    this.gameState.avlAction = null;

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

  actionMove(index) {
    this.deselectBoth(index);
    this.gameState.selected.position = index;
    this.gamePlay.redrawPositions(this.gameState.field);
    this.cleanAfterTurn();

    // computers turn
    this.ai.makeTurn();
  }

  actionAttack(index) {
    const findedPers = this.gameState.field.find((item) => item.position === index);
    const target = findedPers.character;
    const damage = countDamage(this.gameState.selected, findedPers);

    // Attack visualisation here
    this.gamePlay.showDamage(index, damage).finally(() => {
      target.health -= damage;
      if (target.health <= 0) {
        const indexForDelete = this.gameState.field.indexOf(findedPers);
        this.gameState.field.splice(indexForDelete, 1);
      }

      this.gamePlay.redrawPositions(this.gameState.field);
      this.deselectBoth(index);
      this.cleanAfterTurn();

      // computers turn
      this.ai.makeTurn();
    });
  }

  actionSelect(index) {
    const characterOnCell = this.gameState.field.find((item) => item.position === index);
    const selectedPosition = this.gameState.selected ? this.gameState.selected.position : null;

    if (selectedPosition === index) {
      this.gamePlay.deselectCell(index);
      this.gameState.selected = null;
    } else if (selectedPosition === null) {
      this.gamePlay.selectCell(index);
      this.gameState.selected = characterOnCell;
    } else {
      this.gamePlay.deselectCell(selectedPosition);
      this.gamePlay.selectCell(index);
      this.gameState.selected = characterOnCell;
    }
  }

  deselectBoth(index) {
    this.gamePlay.deselectCell(this.gameState.selected.position);
    this.gamePlay.deselectCell(index);
  }

  // Rename to cleanAfterPlayersTurn
  cleanAfterTurn() {
    this.gameState.selected = null;
    this.gameState.avlAction = null;
  }

  createAndShowTooltip(index, personOnCell) {
    const pers = personOnCell.character;
    const message = `🎖${pers.level} ⚔${pers.attack} 🛡${pers.defence} ❤${pers.health}`;
    this.gamePlay.showCellTooltip(message, index);
  }
}
