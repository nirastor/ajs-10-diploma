import { characterGenerator } from './generators';
import PositionedCharacter from './PositionedCharacter';

import Bowman from './Characters/Bowman';
import Swordsman from './Characters/Swordsman';
import Magician from './Characters/Magician';
import Vampire from './Characters/Vampire';
import Undead from './Characters/Undead';
import Daemon from './Characters/Daemon';

export default class GameState {
  constructor() {
    this.field = [];
    this.activePlayer = 'gamer';
    this.selected = null;
    this.avlAction = null;
    this.level = 1;
    this.maxScore = 0;
    this.gamePlay = true;
    this.characterConstructors = {
      bowman: Bowman,
      swordsman: Swordsman,
      magician: Magician,
      vampire: Vampire,
      undead: Undead,
      daemon: Daemon,
    };
  }

  changeActivePlayer() {
    this.activePlayer = (this.activePlayer === 'gamer') ? 'computer' : 'gamer';
  }

  getState() {
    return {
      field: this.field,
      activePlayer: this.activePlayer,
      selected: this.selected,
      avlAction: this.avlAction,
      level: this.level,
      maxScore: this.maxScore,
      gamePlay: this.gamePlay,
    };
  }

  setState(obj) {
    this.activePlayer = obj.activePlayer;
    this.selected = obj.selected;
    this.avlAction = obj.avlAction;
    this.level = obj.level;
    this.maxScore = obj.maxScore;
    this.gamePlay = obj.gamePlay;

    this.field = [];
    obj.field.forEach((pers) => {
      const newPers = characterGenerator([this.characterConstructors[pers.character.type]], 1);

      // Не через цикл чтобы не зацепить лишнего. Нужны эти и только эти свойства
      newPers.level = pers.character.level;
      newPers.attack = pers.character.attack;
      newPers.defence = pers.character.defence;
      newPers.health = pers.character.health;

      this.field.push(new PositionedCharacter(newPers, pers.position));
    });
  }
}
