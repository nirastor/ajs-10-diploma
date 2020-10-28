import { characterGenerator, generateTeam } from '../generators';
import Bowman from '../Characters/Bowman';
import Swordsman from '../Characters/Swordsman';
import Magician from '../Characters/Magician';
import Vampire from '../Characters/Vampire';
import Undead from '../Characters/Undead';
import Daemon from '../Characters/Daemon';

// In this test I have to change expect and recive, because couldnt find matcher like "toBeIn"
test('should create right character for players characters set', () => {
  const received = characterGenerator([Bowman, Swordsman, Magician], 1);
  expect(['bowman', 'swordsman', 'magician']).toContain(received.type);
});

// In this test I have to change expect and recive, because couldnt find matcher like "toBeIn"
test('should create right character for computers characters set', () => {
  const received = characterGenerator([Vampire, Undead, Daemon], 1);
  expect(['vampire', 'undead', 'daemon']).toContain(received.type);
});

test('should create Bowman (lvl 1)', () => {
  const received = characterGenerator([Bowman], 1);

  expect(received.attack).toBe(25);
  expect(received.defence).toBe(25);
  expect(received.health).toBe(100);
  expect(received.level).toBe(1);
  expect(received.type).toBe('bowman');
  expect(received.moveRange).toBe(2);
  expect(received.attackRange).toBe(10);
});

test('should create Swordsman', () => {
  const received = characterGenerator([Swordsman], 1);

  expect(received.attack).toBe(40);
  expect(received.defence).toBe(10);
  expect(received.health).toBe(100);
  expect(received.level).toBe(1);
  expect(received.type).toBe('swordsman');
  expect(received.moveRange).toBe(4);
  expect(received.attackRange).toBe(1);
});

test('should create Magician', () => {
  const received = characterGenerator([Magician], 1);

  expect(received.attack).toBe(10);
  expect(received.defence).toBe(40);
  expect(received.health).toBe(100);
  expect(received.level).toBe(1);
  expect(received.type).toBe('magician');
  expect(received.moveRange).toBe(1);
  expect(received.attackRange).toBe(4);
});

test('should create Vampire', () => {
  const received = characterGenerator([Vampire], 1);

  expect(received.attack).toBe(25);
  expect(received.defence).toBe(25);
  expect(received.health).toBe(100);
  expect(received.level).toBe(1);
  expect(received.type).toBe('vampire');
  expect(received.moveRange).toBe(2);
  expect(received.attackRange).toBe(2);
});

test('should create Undead', () => {
  const received = characterGenerator([Undead], 1);

  expect(received.attack).toBe(40);
  expect(received.defence).toBe(10);
  expect(received.health).toBe(100);
  expect(received.level).toBe(1);
  expect(received.type).toBe('undead');
  expect(received.moveRange).toBe(4);
  expect(received.attackRange).toBe(1);
});

test('should create Daemon', () => {
  const received = characterGenerator([Daemon], 1);

  expect(received.attack).toBe(10);
  expect(received.defence).toBe(40);
  expect(received.health).toBe(100);
  expect(received.level).toBe(1);
  expect(received.type).toBe('daemon');
  expect(received.moveRange).toBe(1);
  expect(received.attackRange).toBe(4);
});

test('should create daemon less or equal 10 lvl', () => {
  const received = characterGenerator([Daemon], 10);
  expect(received.level).toBeLessThanOrEqual(10);
});

test('Should create three daemons not greater than 2-nd level', () => {
  const recieved = generateTeam([Daemon], 2, 3);
  expect(recieved.length).toBe(3);
  expect(recieved[0].type).toBe('daemon');
  expect(recieved[1].level).toBeLessThanOrEqual(2);
});
