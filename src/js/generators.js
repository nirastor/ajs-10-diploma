/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
import Bowman from './Characters/Bowman';
import Swordsman from './Characters/Swordsman';
import Magician from './Characters/Magician';
import Vampire from './Characters/Vampire';
import Undead from './Characters/Undead';
import Daemon from './Characters/Daemon';

/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */

export function characterGenerator(allowedTypes, maxLevel) {
  const typeIndex = Math.floor(Math.random() * allowedTypes.length);
  const Type = allowedTypes[typeIndex];
  const level = Math.floor(Math.random() * maxLevel) + 1;

  return new Type(level);
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const result = [];
  for (let i = 0; i < characterCount; i += 1) {
    result.push(characterGenerator(allowedTypes, maxLevel));
  }
  return result;
}
