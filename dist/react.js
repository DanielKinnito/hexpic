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
        setIsLoading(true);
        setError(null);
        try {
            const mergedOptions = { ...optionsRef.current, ...options };
            const hexpic = new HexPic(mergedOptions);
            let res;
            if (typeof source === 'string') {
                res = await hexpic.fromUrl(source);
            }
            else if (source instanceof File) {
                res = await hexpic.fromFile(source);
            }
            else {
                res = await hexpic.fromImageElement(source);
            }
            setResult(res);
        }
        catch (err) {
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
//# sourceMappingURL=react.js.map