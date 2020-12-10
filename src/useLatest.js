import { useRef, useEffect } from 'react';

/**
 * Hook that stores the most recent value in a ref
 * @param {*} value - value to store
 * @returns {RefObject} - ref with the most recent value
 */
export default function useLatest(value) {
    const ref = useRef(value);
    // store current value
    useEffect(() => {
        ref.current = value;
    });
    // return ref
    return ref;
}