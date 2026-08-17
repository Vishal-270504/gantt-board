import { describe, it, expect } from 'vitest';
import { formatDate } from '../utils/date';

describe('formatDate', () => {
  it('should return empty string for empty input', () => {
    expect(formatDate('')).toBe('');
    expect(formatDate(null as any)).toBe('');
    expect(formatDate(undefined as any)).toBe('');
  });

  it('should return empty string for invalid dates', () => {
    expect(formatDate('invalid-date')).toBe('');
    expect(formatDate('not-a-date')).toBe('');
    expect(formatDate('2026-13-01')).toBe(''); // Invalid month
  });

  it('should format dates in DD MMM YYYY format by default', () => {
    const date = '2026-08-17T12:00:00';
    const result = formatDate(date);
    expect(result).toContain('17');
    expect(result).toContain('Aug');
    expect(result).toContain('2026');
  });

  it('should format dates in DD/MM/YYYY format', () => {
    const date = '2026-08-17T12:00:00';
    const result = formatDate(date, { dateFormat: 'DD/MM/YYYY' });
    expect(result).toBe('17/08/2026');
  });

  it('should format dates in MM/DD/YYYY format', () => {
    const date = '2026-08-17T12:00:00';
    const result = formatDate(date, { dateFormat: 'MM/DD/YYYY' });
    expect(result).toBe('08/17/2026');
  });

  it('should format dates in YYYY-MM-DD format', () => {
    const date = '2026-08-17T12:00:00';
    const result = formatDate(date, { dateFormat: 'YYYY-MM-DD' });
    expect(result).toBe('2026-08-17');
  });

  it('should format dates with time in 24-hour format', () => {
    const date = '2026-08-17T14:30:00';
    const result = formatDate(date, { 
      dateFormat: 'YYYY-MM-DD', 
      timeFormat: '24-hour',
      showTime: true 
    });
    expect(result).toBe('2026-08-17 14:30');
  });

  it('should format dates with time in 12-hour format', () => {
    const date = '2026-08-17T14:30:00';
    const result = formatDate(date, { 
      dateFormat: 'YYYY-MM-DD', 
      timeFormat: '12-hour',
      showTime: true 
    });
    expect(result).toBe('2026-08-17 02:30 PM');
  });

  it('should not show time when showTime is false', () => {
    const date = '2026-08-17T14:30:00';
    const result = formatDate(date, { 
      dateFormat: 'YYYY-MM-DD', 
      showTime: false 
    });
    expect(result).toBe('2026-08-17');
  });
});