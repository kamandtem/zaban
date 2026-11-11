import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeSentence,
  validateWheelAnswer,
  validateWordOrder,
  calculateStreak,
  getPresentToBe,
  getPresentDoDoes
} from './grammarRules.js';

test('normalizeSentence removes redundant whitespaces and fixes punctuation spacing', () => {
  assert.equal(normalizeSentence('  I   am    a student . '), 'I am a student.');
});

test('validateWheelAnswer compares case-insensitively', () => {
  assert.equal(validateWheelAnswer('am', 'am'), true);
  assert.equal(validateWheelAnswer('Am', 'am'), true);
  assert.equal(validateWheelAnswer('is', 'am'), false);
});

test('validateWordOrder verifies scrambled words assemble into expected sentence', () => {
  const words = ['She', 'reads', 'books', 'every', 'day'];
  assert.equal(validateWordOrder(words, 'She reads books every day.'), true);
  assert.equal(validateWordOrder(['Books', 'reads', 'she'], 'She reads books'), false);
});

test('calculateStreak increments when 1 day passes and resets when missed', () => {
  const today = new Date('2026-10-22T10:00:00Z');
  const yesterday = '2026-10-21';
  const threeDaysAgo = '2026-10-18';

  // Active on consecutive day
  const resultConsecutive = calculateStreak(3, yesterday, today);
  assert.equal(resultConsecutive.newStreak, 4);

  // Active on same day doesn't double-count
  const resultSameDay = calculateStreak(4, '2026-10-22', today);
  assert.equal(resultSameDay.newStreak, 4);

  // Active after a break resets streak
  const resultBroken = calculateStreak(5, threeDaysAgo, today);
  assert.equal(resultBroken.newStreak, 1);
});

test('grammar agreement rules return correct to-be forms', () => {
  assert.equal(getPresentToBe('I'), 'am');
  assert.equal(getPresentToBe('she'), 'is');
  assert.equal(getPresentToBe('they'), 'are');
  assert.equal(getPresentToBe('cat'), null);

  assert.equal(getPresentDoDoes('she'), 'does');
  assert.equal(getPresentDoDoes('they'), 'do');
});
