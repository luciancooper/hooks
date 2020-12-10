import { useRef, useEffect } from 'react';

/**
 * Hook that returns a value from the previous render
 * @param {*} value - value to store
 * @param {*} initialValue - initial value
 * @returns {*} - value from the previous render
 */
export default function usePrevious(value, initialValue) {
    const ref = useRef(initialValue);
    // store current value
    useEffect(() => {
        ref.current = value;
    }, [value]);
    // return previous value
    return ref.current;
}