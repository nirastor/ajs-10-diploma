export default class GameState {
  constructor() {
    this.field = [];
    this.activePlayer = 'gamer';
    this.selected = null;
    this.avlAction = null;
    this.level = 1;
  }

  changeActivePlayer() {
    this.activePlayer = (this.activePlayer === 'gamer') ? 'computer' : 'gamer';
  }

  // eslint-disable-next-line no-unused-vars
  static from(object) {
    // TODO: create object
    return null;
  }
}
