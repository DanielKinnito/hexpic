import React from 'react';
import { AsciiArtOptions, AsciiArtResult } from './types';
export interface UseHexPicResult {
    ascii: string;
    width: number;
    height: number;
    result: AsciiArtResult | null;
    isLoading: boolean;
    error: Error | null;
    convert: (source: string | File | HTMLImageElement, options?: AsciiArtOptions) => Promise<void>;
}
/**
 * React hook for using HexPic
 * @param defaultOptions Default options for ASCII art generation
 * @returns Object containing the result, loading state, error, and convert function
 */
export declare function useHexPic(defaultOptions?: AsciiArtOptions): UseHexPicResult;
export interface HexPicImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    alt?: string;
    options?: AsciiArtOptions;
}
export declare const HexPicImage: React.FC<HexPicImageProps>;
//# sourceMappingURL=react.d.ts.map