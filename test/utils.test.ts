import {
  rgbToGrayscale,
  adjustContrast,
  adjustBrightness,
  getAsciiChar,
  DEFAULT_CHARSET,
} from '../src/utils';

describe('utils', () => {
  describe('rgbToGrayscale', () => {
    it('should convert RGB to grayscale correctly', () => {
      // Test with known values
      expect(rgbToGrayscale(0, 0, 0)).toBe(0); // Black
      expect(rgbToGrayscale(255, 255, 255)).toBe(255); // White
      expect(rgbToGrayscale(128, 128, 128)).toBe(128); // Gray
      // Test with different weights
      expect(rgbToGrayscale(100, 150, 200)).toBe(143); // 0.2126*100 + 0.7152*150 + 0.0722*200 = 21.26 + 107.28 + 14.44 = 142.98 -> 143
    });
  });

  describe('adjustContrast', () => {
    it('should increase contrast correctly', () => {
      expect(adjustContrast(128, 2)).toBe(128); // Middle gray stays the same
      expect(adjustContrast(200, 2)).toBe(255); // Clipped to 255
      expect(adjustContrast(50, 2)).toBe(0); // Clipped to 0
    });

    it('should decrease contrast correctly', () => {
      expect(adjustContrast(128, 0.5)).toBe(128); // Middle gray stays the same
      expect(adjustContrast(200, 0.5)).toBe(164); // Moved toward middle
      expect(adjustContrast(50, 0.5)).toBe(89); // Moved toward middle
    });
  });

  describe('adjustBrightness', () => {
    it('should increase brightness correctly', () => {
      expect(adjustBrightness(100, 0.5)).toBe(177.5); // 100 + (255-100)*0.5
      expect(adjustBrightness(200, 0.5)).toBe(227.5); // 200 + (255-200)*0.5
      expect(adjustBrightness(255, 0.5)).toBe(255); // Clipped to 255
    });

    it('should decrease brightness correctly', () => {
      expect(adjustBrightness(100, -0.5)).toBe(50); // 100 * 0.5
      expect(adjustBrightness(50, -1)).toBe(0); // Clipped to 0
    });
  });

  describe('getAsciiChar', () => {
    it('should return correct character for brightness', () => {
      const charset = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
      expect(getAsciiChar(0, charset)).toBe('$'); // Darkest
      expect(getAsciiChar(255, charset)).toBe(' '); // Lightest
      expect(getAsciiChar(128, charset)).toBe('L'); // Middle
    });

    it('should handle single character charsets', () => {
      expect(getAsciiChar(0, '@')).toBe('@');
      expect(getAsciiChar(255, '@')).toBe('@');
    });
  });
});