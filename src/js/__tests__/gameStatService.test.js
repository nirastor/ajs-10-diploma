import GameStateService from '../GameStateService';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

const storage = new LocalStorageMock();
const gameStateService = new GameStateService(storage);

test('Should load state', () => {
  storage.setItem('state', JSON.stringify({ teststate: 1 }));
  const recived = gameStateService.load().teststate;
  expect(recived).toBe(1);
});

test('Load should throw Invalid state', () => {
  storage.setItem('state', 'this is not JSON');
  expect(() => {
    gameStateService.load();
  }).toThrow('Invalid state');
});
