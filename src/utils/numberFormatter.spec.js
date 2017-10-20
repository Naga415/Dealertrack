import {getCurrencyFormattedNumber, getFormattedNumber, isInt, scrubFormatting} from './numberFormatter';

describe('Number Formatter', () => {
  describe('getCurrencyFormattedNumber', () => {
    it('returns $5.50 when passed 5.5', () => {
      expect(getCurrencyFormattedNumber(5.5)).toBe('$5.50');
    });
  });

  describe('isInt', () => {
    it('returns true when passed 0', () => {
      expect(isInt(0)).toBe(true);
    });

    it('returns false when passed an empty string', () => {
      expect(isInt('')).toBe(false);
    });

    it('returns true when passed int as a string', () => {
      expect(isInt('5')).toBe(true);
    });
  });

  describe('scrubFormatting', () => {
    it('strips commas and decimals', () => {
      expect(scrubFormatting('1,234.56')).toBe('123456');
    });
  });

  describe('getFormattedNumber', () => {
    it('returns 0 if passed 0', () => {
      expect(getFormattedNumber(0)).toBe(0);
    });

    it('returns empty string if passed empty string', () => {
      expect(getFormattedNumber('')).toBe('');
    });
  });
});
