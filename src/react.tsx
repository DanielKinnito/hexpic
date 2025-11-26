import React, { useState, useCallback, useRef, useEffect } from 'react';
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
        console.log('useHexPic: convert called', { source, options });
        setIsLoading(true);
        setError(null);

        try {
            const mergedOptions = { ...optionsRef.current, ...options };
            console.log('useHexPic: options merged', mergedOptions);
            const hexpic = new HexPic(mergedOptions);

            let res: AsciiArtResult;
            if (typeof source === 'string') {
                console.log('useHexPic: converting from URL');
                res = await hexpic.fromUrl(source);
            } else if (source instanceof File) {
                console.log('useHexPic: converting from File');
                res = await hexpic.fromFile(source);
            } else {
                console.log('useHexPic: converting from Image Element');
                res = await hexpic.fromImageElement(source);
            }

            console.log('useHexPic: conversion successful', { width: res.width, height: res.height, asciiLength: res.ascii.length });
            setResult(res);
        } catch (err) {
            console.error('useHexPic: conversion failed', err);
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

export interface HexPicImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    alt?: string;
    options?: AsciiArtOptions;
}

export const HexPicImage: React.FC<HexPicImageProps> = ({
    src,
    alt,
    options,
    style,
    ...props
}) => {
    const { ascii, isLoading, error, convert } = useHexPic(options);

    useEffect(() => {
        if (src) {
            convert(src);
        }
    }, [src, convert, options]);

    if (error) {
        console.error('HexPicImage error:', error);
        return (
            <div style={{ color: 'red', ...style }} {...props}>
                Error generating ASCII art
            </div>
        );
    }

    return (
        <div
            style={{
                fontFamily: 'monospace',
                whiteSpace: 'pre',
                lineHeight: '0.6em',
                overflow: 'hidden',
                fontSize: '10px', // Default, can be overridden by style prop
                ...style
            }}
            aria-label={alt || 'ASCII Art'}
            role="img"
            {...props}
        >
            {isLoading ? 'Loading...' : ascii}
        </div>
    );
};
