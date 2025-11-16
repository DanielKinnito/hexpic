import HexPic from '../src/HexPic';
import { AsciiArtResult } from '../src/types';

// Mock HTMLImageElement and CanvasRenderingContext2D
class MockImage {
  width: number;
  height: number;
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  src: string = '';

  constructor(width: number = 100, height: number = 100) {
    this.width = width;
    this.height = height;
    setTimeout(() => this.onload?.(), 0);
  }
}

// Mock global Image
(global as any).Image = MockImage;

// Mock CanvasRenderingContext2D
const mockGetImageData = jest.fn();
const mockDrawImage = jest.fn();

const mockCtx = {
  getImageData: mockGetImageData,
  drawImage: mockDrawImage,
  fillRect: jest.fn(),
  fillStyle: '',
  fillText: jest.fn(),
};

// Mock getContext
HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCtx as any);

describe('HexPic', () => {
  let hexpic: HexPic;
  const mockImageData = {
    data: new Uint8ClampedArray(100 * 100 * 4).fill(128), // Gray image
    width: 100,
    height: 100,
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    mockGetImageData.mockReturnValue(mockImageData);
    hexpic = new HexPic();
  });

  describe('constructor', () => {
    it('should initialize with default options', () => {
      expect(hexpic).toBeInstanceOf(HexPic);
    });

    it('should apply custom options', () => {
      const customHexpic = new HexPic({
        width: 40,
        height: 30,
        contrast: 1.5,
        brightness: 0.5,
      });
      expect(customHexpic).toBeInstanceOf(HexPic);
    });
  });

  describe('setOptions', () => {
    it('should update options', () => {
      const newOptions = { width: 50, height: 50 };
      hexpic.setOptions(newOptions);
      // Add assertion to check if options were updated
    });
  });

  describe('fromImageElement', () => {
    it('should convert an image to ASCII', async () => {
      const img = new Image(100, 100);
      const result = await hexpic.fromImageElement(img as any);
      expect(result).toHaveProperty('ascii');
      expect(result).toHaveProperty('width');
      expect(result).toHaveProperty('height');
    });

    it('should handle different image dimensions', async () => {
      const img = new Image(200, 100);
      const result = await hexpic.fromImageElement(img as any);
      expect(result.width).toBeLessThanOrEqual(80); // Default width
      expect(result.height).toBeLessThanOrEqual(40); // Default height
    });
  });

  describe('fromUrl', () => {
    it('should load and convert an image from URL', async () => {
      const result = await hexpic.fromUrl('https://example.com/image.jpg');
      expect(result).toHaveProperty('ascii');
    });

    it('should reject on invalid URL', async () => {
      // Mock Image to trigger onerror
      (global as any).Image = class {
        onerror: (() => void) | null = null;
        src: string = '';
        constructor() {
          setTimeout(() => this.onerror?.(), 0);
        }
      };

      await expect(hexpic.fromUrl('invalid-url')).rejects.toThrow();
    });
  });

  describe('fromFile', () => {
    it('should convert a file to ASCII', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const result = await hexpic.fromFile(file);
      expect(result).toHaveProperty('ascii');
    });

    it('should reject on invalid file', async () => {
      const file = new File([], 'test.txt', { type: 'text/plain' });
      await expect(hexpic.fromFile(file)).rejects.toThrow('Invalid image file');
    });
  });

  describe('resizing', () => {
    it('should respect aspect ratio when resizing', async () => {
      const img = new Image(200, 100);
      const result = await hexpic.fromImageElement(img as any, { width: 40 });
      expect(result.width).toBe(40);
      expect(result.height).toBe(20); // Maintains 2:1 aspect ratio
    });

    it('should handle custom dimensions', async () => {
      const img = new Image(100, 100);
      const result = await hexpic.fromImageElement(img as any, { 
        width: 50, 
        height: 30,
        preserveAspectRatio: false
      });
      expect(result.width).toBe(50);
      expect(result.height).toBe(30);
    });
  });

  describe('security', () => {
    it('should sanitize input URLs', async () => {
      const maliciousUrl = 'javascript:alert("xss")';
      await expect(hexpic.fromUrl(maliciousUrl)).rejects.toThrow();
    });

    it('should handle large images safely', async () => {
      // Test with very large image
      const largeImg = new Image(10000, 10000);
      await expect(hexpic.fromImageElement(largeImg as any)).resolves.toBeDefined();
      // Add memory check if possible
    });

    it('should handle corrupted image data', async () => {
      // Mock getImageData to return corrupted data
      mockGetImageData.mockImplementation(() => {
        throw new Error('Corrupted image data');
      });
      const img = new Image(100, 100);
      await expect(hexpic.fromImageElement(img as any)).rejects.toThrow();
    });
  });
});