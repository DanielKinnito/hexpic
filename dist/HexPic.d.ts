import { AsciiArtOptions, AsciiArtResult } from './types';
/**
 * Main class for converting images to ASCII art
 */
export declare class HexPic {
    private options;
    private canvas;
    private ctx;
    /**
     * Creates a new HexPic instance
     * @param options Optional configuration options
     */
    constructor(options?: AsciiArtOptions);
    /**
     * Updates the options for ASCII art generation
     * @param options New options to merge with existing ones
     */
    setOptions(options: AsciiArtOptions): void;
    /**
     * Converts an image element to ASCII art
     * @param image The image element to convert
     * @returns A promise that resolves to the ASCII art result
     */
    fromImageElement(image: HTMLImageElement, p0: {
        width: number;
        height: number;
        preserveAspectRatio: boolean;
    }): Promise<AsciiArtResult>;
    /**
     * Converts an image URL to ASCII art
     * @param url The URL of the image to convert
     * @returns A promise that resolves to the ASCII art result
     */
    fromUrl(url: string): Promise<AsciiArtResult>;
    /**
     * Converts a file to ASCII art
     * @param file The image file to convert
     * @returns A promise that resolves to the ASCII art result
     */
    fromFile(file: File): Promise<AsciiArtResult>;
    /**
     * Internal method to handle the image conversion
     * @param image The image to convert
     * @private
     */
    private convertImage;
}
//# sourceMappingURL=HexPic.d.ts.map