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
//# sourceMappingURL=react.d.ts.map