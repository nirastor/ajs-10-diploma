export default class Character {
  constructor(level, type) {
    if (new.target === Character) {
      throw new Error('Character is basic class. new Character not allowed');
    }

    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 100;
    this.type = type;
  }
}
