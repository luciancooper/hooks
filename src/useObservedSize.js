import { useState, useRef, useLayoutEffect } from 'react';

/**
 * Hook that tracks an element's size using the Resize Observer API
 * @param {Ref} target - React ref containing the target DOM element
 * @returns {Object} - contentRect from a ResizeObserverEntry
 */
export default function useObservedSize(target) {
    const [entry, setEntry] = useState({}),
        // ref to store ResizeObserver instance
        observer = useRef(null);

    useLayoutEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new ResizeObserver(([e]) => {
            setEntry(e);
        });
        if (target.current) {
            observer.current.observe(target.current);
        }
        // return cleanup function
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [target]);

    // return entry contentRect or an empty object
    return entry.contentRect || {};
}