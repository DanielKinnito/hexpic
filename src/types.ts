/**
 * Options for ASCII art generation
 */
export interface AsciiArtOptions {
  /** Width of the output ASCII art (in characters) */
  width?: number;
  /** Height of the output ASCII art (in characters) */
  height?: number;
  /** Character set to use for different brightness levels */
  charset?: string;
  /** Whether to invert the brightness (for dark mode) */
  invert?: boolean;
  /** Contrast adjustment (0-2, where 1 is normal) */
  contrast?: number;
  /** Brightness adjustment (-1 to 1, where 0 is normal) */
  brightness?: number;
  /** Whether to preserve aspect ratio (default: true) */
  preserveAspectRatio?: boolean;
  /** Background color for transparent images (in hex format, e.g., '#000000') */
  backgroundColor?: string;
}

/**
 * Represents the result of ASCII art conversion
 */
export interface AsciiArtResult {
  /** The ASCII art as a string */
  ascii: string;
  /** The width of the ASCII art in characters */
  width: number;
  /** The height of the ASCII art in characters */
  height: number;
  /** The character set used for the conversion */
  charset: string;
}
