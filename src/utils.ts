/**
 * Default character set for ASCII art, from darkest to lightest
 */
export const DEFAULT_CHARSET = '@%#*+=-:. ';

/**
 * Converts an RGB value to grayscale using the luminosity method
 * @param r Red component (0-255)
 * @param g Green component (0-255)
 * @param b Blue component (0-255)
 * @returns Grayscale value (0-255)
 */
export function rgbToGrayscale(r: number, g: number, b: number): number {
  // Luminosity method (perceived brightness)
  return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
}

/**
 * Adjusts the contrast of a value
 * @param value The value to adjust (0-255)
 * @param contrast Contrast factor (0-2, where 1 is normal)
 * @returns Adjusted value (0-255)
 */
export function adjustContrast(value: number, contrast: number): number {
  return Math.min(255, Math.max(0, ((value / 255 - 0.5) * contrast + 0.5) * 255));
}

/**
 * Adjusts the brightness of a value
 * @param value The value to adjust (0-255)
 * @param brightness Brightness adjustment (-1 to 1, where 0 is normal)
 * @returns Adjusted value (0-255)
 */
export function adjustBrightness(value: number, brightness: number): number {
  if (brightness > 0) {
    return value + (255 - value) * brightness;
  } else if (brightness < 0) {
    return value + value * brightness;
  }
  return value;
}

/**
 * Gets the appropriate ASCII character for a given brightness value
 * @param value Brightness value (0-255, where 0 is black)
 * @param charset Character set to use (darkest to lightest)
 * @returns ASCII character
 */
export function getAsciiChar(value: number, charset: string): string {
  // Invert value if needed (so 0 is black, 255 is white)
  const invertedValue = 255 - value;
  const index = Math.floor((invertedValue / 255) * (charset.length - 1));
  return charset[Math.min(index, charset.length - 1)];
}

/**
 * Draws a canvas with the specified background color
 * @param canvas The canvas element
 * @param color The background color in hex format (e.g., '#000000')
 */
export function drawBackground(canvas: HTMLCanvasElement, color: string): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Loads an image from a URL
 * @param url The image URL
 * @returns A promise that resolves to the loaded image
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image: ${e}`));
    img.src = url;
  });
}
