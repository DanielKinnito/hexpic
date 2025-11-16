import { AsciiArtOptions, AsciiArtResult } from './types';
import { 
  DEFAULT_CHARSET, 
  rgbToGrayscale, 
  adjustContrast, 
  adjustBrightness, 
  getAsciiChar, 
  drawBackground,
  loadImage
} from './utils';

/**
 * Default options for ASCII art generation
 */
const DEFAULT_OPTIONS: Required<AsciiArtOptions> = {
  width: 80,
  height: 40,
  charset: DEFAULT_CHARSET,
  invert: false,
  contrast: 1.0,
  brightness: 0,
  preserveAspectRatio: true,
  backgroundColor: '#000000'
};

/**
 * Main class for converting images to ASCII art
 */
export class HexPic {
  private options: Required<AsciiArtOptions>;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  /**
   * Creates a new HexPic instance
   * @param options Optional configuration options
   */
  constructor(options: AsciiArtOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.canvas = document.createElement('canvas');
    const ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      throw new Error('Could not create canvas context');
    }
    this.ctx = ctx;
  }

  /**
   * Updates the options for ASCII art generation
   * @param options New options to merge with existing ones
   */
  public setOptions(options: AsciiArtOptions): void {
    this.options = { ...this.options, ...options };
  }

  /**
   * Converts an image element to ASCII art
   * @param image The image element to convert
   * @returns A promise that resolves to the ASCII art result
   */
  public async fromImageElement(image: HTMLImageElement, p0: { width: number; height: number; preserveAspectRatio: boolean; }): Promise<AsciiArtResult> {
    return this.convertImage(image);
  }

  /**
   * Converts an image URL to ASCII art
   * @param url The URL of the image to convert
   * @returns A promise that resolves to the ASCII art result
   */
  public async fromUrl(url: string): Promise<AsciiArtResult> {
    const image = await loadImage(url);
    return this.convertImage(image);
  }

  /**
   * Converts a file to ASCII art
   * @param file The image file to convert
   * @returns A promise that resolves to the ASCII art result
   */
  public fromFile(file: File): Promise<AsciiArtResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          if (!e.target?.result) {
            throw new Error('Failed to read file');
          }
          const image = new Image();
          image.onload = async () => {
            try {
              const result = await this.convertImage(image);
              resolve(result);
            } catch (err) {
              reject(err);
            }
          };
          image.onerror = () => reject(new Error('Failed to load image from file'));
          image.src = e.target.result as string;
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Internal method to handle the image conversion
   * @param image The image to convert
   * @private
   */
  private async convertImage(image: HTMLImageElement): Promise<AsciiArtResult> {
    const { 
      width: targetWidth, 
      height: targetHeight, 
      contrast, 
      brightness, 
      invert,
      charset,
      backgroundColor,
      preserveAspectRatio
    } = this.options;

    // Calculate dimensions while preserving aspect ratio if needed
    let width = targetWidth;
    let height = targetHeight;
    
    if (preserveAspectRatio) {
      const aspectRatio = image.width / image.height;
      if (width / height > aspectRatio) {
        width = Math.floor(height * aspectRatio);
      } else {
        height = Math.floor(width / aspectRatio);
      }
    }

    // Set canvas dimensions
    this.canvas.width = width;
    this.canvas.height = height;

    // Draw background and image
    drawBackground(this.canvas, backgroundColor);
    this.ctx.drawImage(image, 0, 0, width, height);

    // Get image data
    const imageData = this.ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Convert to ASCII
    let ascii = '';
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Convert to grayscale and apply adjustments
        let gray = rgbToGrayscale(r, g, b);
        gray = adjustContrast(gray, contrast);
        gray = adjustBrightness(gray, brightness);
        gray = invert ? 255 - gray : gray;
        
        // Get ASCII character and add to result
        ascii += getAsciiChar(gray, charset);
      }
      ascii += '\n';
    }

    return {
      ascii,
      width,
      height,
      charset,
    };
  }
}
