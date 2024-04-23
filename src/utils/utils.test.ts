import '@testing-library/jest-dom';
import { formatDateTimeString } from './utils';

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
      // RFC-3339 Date Time String
      const datestring = '2024-02-21T20:14:29.38-05:00';
      expect(formatDateTimeString(datestring)).toBe(datestring);
    });
  });
});
