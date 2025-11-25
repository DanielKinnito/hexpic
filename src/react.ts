import { useState, useCallback, useRef, useEffect } from 'react';
import { HexPic } from './HexPic';
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
export function useHexPic(defaultOptions: AsciiArtOptions = {}): UseHexPicResult {
    const [result, setResult] = useState<AsciiArtResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const optionsRef = useRef(defaultOptions);

    useEffect(() => {
        optionsRef.current = defaultOptions;
    }, [defaultOptions]);

    const convert = useCallback(async (source: string | File | HTMLImageElement, options?: AsciiArtOptions) => {
        setIsLoading(true);
        setError(null);

        try {
            const mergedOptions = { ...optionsRef.current, ...options };
            const hexpic = new HexPic(mergedOptions);

            let res: AsciiArtResult;
            if (typeof source === 'string') {
                res = await hexpic.fromUrl(source);
            } else if (source instanceof File) {
                res = await hexpic.fromFile(source);
            } else {
                res = await hexpic.fromImageElement(source);
            }

            setResult(res);
        } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
            setResult(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        ascii: result?.ascii ?? '',
        width: result?.width ?? 0,
        height: result?.height ?? 0,
        result,
        isLoading,
        error,
        convert
    };
}
