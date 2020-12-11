import { useState, useRef, useLayoutEffect } from 'react';

/**
 * Hook to track an element's size using the Resize Observer API
 * @returns {Array} - [targetRef, contentRect from a ResizeObserverEntry]
 */
export default function useObservedSize() {
    const [entry, setEntry] = useState({}),
        // utilize useState hook as a callback ref
        [target, targetRef] = useState(null),
        // ref to store ResizeObserver instance
        observer = useRef(null);

    useLayoutEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new ResizeObserver(([e]) => {
            setEntry(e);
        });
        if (target) {
            observer.current.observe(target);
        }
        // return cleanup function
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [target]);

    // return target callback ref & entry contentRect
    return [targetRef, entry.contentRect || {}];
}