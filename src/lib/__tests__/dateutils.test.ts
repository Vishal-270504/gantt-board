import { describe, it, expect } from 'vitest';
import { toDate } from '../dateutils';

describe('toDate', () => {
  it('returns a valid Date instance for a valid ISO date', () => {
    expect(toDate('2026-01-15T10:00:00Z')).toBeInstanceOf(Date);
  });

  it('throws for an invalid date string', () => {
    expect(() => toDate('invalid-date')).toThrow('Invalid date: invalid-date');
  });

  it('throws for an empty string', () => {
    expect(() => toDate('')).toThrow();
  });

  it('throws for a value JavaScript treats as invalid', () => {
    expect(() => toDate('2026-13-45T99:99:99Z')).toThrow();
  });

  it('throws for a non-date string', () => {
    expect(() => toDate('not-a-date')).toThrow('Invalid date: not-a-date');
  });

  it('preserves valid date behavior and timestamps', () => {
    const date = toDate('2026-01-15T10:00:00Z');
    expect(date.getUTCFullYear()).toBe(2026);
    expect(date.getUTCMonth()).toBe(0); // January
    expect(date.getUTCDate()).toBe(15);
    expect(date.getTime()).toBe(new Date('2026-01-15T10:00:00Z').getTime());
  });

  it('parses supported ISO-like task date strings', () => {
    const date = toDate('2026-08-01T09:00:00');
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(7); // August
    expect(date.getDate()).toBe(1);
  });
});
