import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useCallback, useRef, useEffect } from 'react';
import { HexPic } from './HexPic';
/**
 * React hook for using HexPic
 * @param defaultOptions Default options for ASCII art generation
 * @returns Object containing the result, loading state, error, and convert function
 */
export function useHexPic(defaultOptions = {}) {
    var _a, _b, _c;
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const optionsRef = useRef(defaultOptions);
    useEffect(() => {
        optionsRef.current = defaultOptions;
    }, [defaultOptions]);
    const convert = useCallback(async (source, options) => {
        console.log('useHexPic: convert called', { source, options });
        setIsLoading(true);
        setError(null);
        try {
            const mergedOptions = { ...optionsRef.current, ...options };
            console.log('useHexPic: options merged', mergedOptions);
            const hexpic = new HexPic(mergedOptions);
            let res;
            if (typeof source === 'string') {
                console.log('useHexPic: converting from URL');
                res = await hexpic.fromUrl(source);
            }
            else if (source instanceof File) {
                console.log('useHexPic: converting from File');
                res = await hexpic.fromFile(source);
            }
            else {
                console.log('useHexPic: converting from Image Element');
                res = await hexpic.fromImageElement(source);
            }
            console.log('useHexPic: conversion successful', { width: res.width, height: res.height, asciiLength: res.ascii.length });
            setResult(res);
        }
        catch (err) {
            console.error('useHexPic: conversion failed', err);
            setError(err instanceof Error ? err : new Error(String(err)));
            setResult(null);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    return {
        ascii: (_a = result === null || result === void 0 ? void 0 : result.ascii) !== null && _a !== void 0 ? _a : '',
        width: (_b = result === null || result === void 0 ? void 0 : result.width) !== null && _b !== void 0 ? _b : 0,
        height: (_c = result === null || result === void 0 ? void 0 : result.height) !== null && _c !== void 0 ? _c : 0,
        result,
        isLoading,
        error,
        convert
    };
}
export const HexPicImage = ({ src, alt, options, style, ...props }) => {
    const { ascii, isLoading, error, convert } = useHexPic(options);
    useEffect(() => {
        if (src) {
            convert(src);
        }
    }, [src, convert, options]);
    if (error) {
        console.error('HexPicImage error:', error);
        return (_jsx("div", { style: { color: 'red', ...style }, ...props, children: "Error generating ASCII art" }));
    }
    return (_jsx("div", { style: {
            fontFamily: 'monospace',
            whiteSpace: 'pre',
            lineHeight: '0.6em',
            overflow: 'hidden',
            fontSize: '10px', // Default, can be overridden by style prop
            ...style
        }, "aria-label": alt || 'ASCII Art', role: "img", ...props, children: isLoading ? 'Loading...' : ascii }));
};
//# sourceMappingURL=react.js.map