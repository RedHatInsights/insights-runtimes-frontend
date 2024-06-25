import '@testing-library/jest-dom';
import { formatDateTimeString, formatExactUTCString } from './utils';

describe('Utilities', () => {
  describe('formatDateTimeString()', () => {
    it('should format simplified ISO-8061 date time strings', () => {
      const datestring = '2024-02-21T20:14:29.380Z';
      expect(formatDateTimeString(datestring)).not.toEqual('Invalid Date');
    });

    it('should handle ISO-8061 ZonedDateTime strings from Java', () => {
      const datestring = '2024-02-21T20:14:29.380397Z';
      expect(formatDateTimeString(datestring)).not.toEqual('Invalid Date');
    });

    it('should return the passed value as a fallback', () => {
      const datestring = '2024-02-21T20:14:29.38-05:00Z';
      expect(formatDateTimeString(datestring)).toBe(datestring);
    });
  });

  describe('formatExactUTCString()', () => {
    it('should return an expected format of DD MMM YYYY HH:MM UTC', () => {
      const utcstring = 'Fri, 26 Jan 2024 08:08:08 GMT';
      expect(formatExactUTCString(utcstring)).toBe('26 Jan 2024 08:08 UTC');
    });
  });
});
