export default class GameState {
  constructor() {
    this.field = [];
    this.activePlayer = '';
    this.selected = null;
    this.avlAction = null;
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
