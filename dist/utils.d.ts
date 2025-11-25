/**
 * Default character set for ASCII art, from darkest to lightest
 */
export declare const DEFAULT_CHARSET = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
/**
 * Converts an RGB value to grayscale using the sRGB luminance (Rec. 709) method
 * @param r Red component (0-255)
 * @param g Green component (0-255)
 * @param b Blue component (0-255)
 * @returns Grayscale value (0-255)
 */
export declare function rgbToGrayscale(r: number, g: number, b: number): number;
/**
 * Adjusts the contrast of a value
 * @param value The value to adjust (0-255)
 * @param contrast Contrast factor (>0, where 1 is normal)
 * @returns Adjusted value (0-255)
 */
export declare function adjustContrast(value: number, contrast: number): number;
/**
 * Adjusts the brightness of a value
 * @param value The value to adjust (0-255)
 * @param brightness Brightness adjustment (-1 to 1, where 0 is normal)
 * @returns Adjusted value (0-255)
 */
export declare function adjustBrightness(value: number, brightness: number): number;
/**
 * Gets the appropriate ASCII character for a given brightness value
 * @param value Brightness value (0-255, where 0 is darkest)
 * @param charset Character set to use (darkest to lightest)
 * @returns ASCII character
 */
export declare function getAsciiChar(value: number, charset: string): string;
/**
 * Draws a canvas with the specified background color
 * @param canvas The canvas element
 * @param color The background color in hex format (e.g., '#000000')
 */
export declare function drawBackground(canvas: HTMLCanvasElement, color: string): void;
/**
 * Loads an image from a URL
 * @param url The image URL
 * @returns A promise that resolves to the loaded image
 */
export declare function loadImage(url: string): Promise<HTMLImageElement>;
//# sourceMappingURL=utils.d.ts.map