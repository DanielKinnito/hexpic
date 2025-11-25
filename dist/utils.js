/**
 * Default character set for ASCII art, from darkest to lightest
 */
export const DEFAULT_CHARSET = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
/**
 * Converts an RGB value to grayscale using the sRGB luminance (Rec. 709) method
 * @param r Red component (0-255)
 * @param g Green component (0-255)
 * @param b Blue component (0-255)
 * @returns Grayscale value (0-255)
 */
export function rgbToGrayscale(r, g, b) {
    // sRGB luminance (perceived brightness)
    return Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
}
/**
 * Adjusts the contrast of a value
 * @param value The value to adjust (0-255)
 * @param contrast Contrast factor (>0, where 1 is normal)
 * @returns Adjusted value (0-255)
 */
export function adjustContrast(value, contrast) {
    // Scale around mid-gray (128) so middle tones remain stable
    const centered = value - 128;
    const adjusted = centered * contrast + 128;
    return Math.min(255, Math.max(0, adjusted));
}
/**
 * Adjusts the brightness of a value
 * @param value The value to adjust (0-255)
 * @param brightness Brightness adjustment (-1 to 1, where 0 is normal)
 * @returns Adjusted value (0-255)
 */
export function adjustBrightness(value, brightness) {
    if (brightness > 0) {
        return value + (255 - value) * brightness;
    }
    else if (brightness < 0) {
        return value + value * brightness;
    }
    return value;
}
/**
 * Gets the appropriate ASCII character for a given brightness value
 * @param value Brightness value (0-255, where 0 is darkest)
 * @param charset Character set to use (darkest to lightest)
 * @returns ASCII character
 */
export function getAsciiChar(value, charset) {
    // Clamp brightness and normalise to [0, 1]
    const clamped = Math.min(255, Math.max(0, value));
    const normalized = clamped / 255;
    // Apply a slight gamma curve so mid-tones map to visually pleasing characters
    const gamma = 1.5;
    const adjusted = Math.pow(normalized, gamma);
    const index = Math.floor(adjusted * (charset.length - 1));
    return charset[Math.min(Math.max(index, 0), charset.length - 1)];
}
/**
 * Draws a canvas with the specified background color
 * @param canvas The canvas element
 * @param color The background color in hex format (e.g., '#000000')
 */
export function drawBackground(canvas, color) {
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
/**
 * Loads an image from a URL
 * @param url The image URL
 * @returns A promise that resolves to the loaded image
 */
export function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(new Error(`Failed to load image: ${e}`));
        img.src = url;
    });
}
//# sourceMappingURL=utils.js.map