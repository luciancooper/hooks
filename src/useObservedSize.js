import { useState, useLayoutEffect } from 'react';

let resizeObserver;

function createResizeObserver() {
    const targetMap = new WeakMap(),
        observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                const handler = targetMap.get(entry.target);
                if (handler) handler(entry.contentRect);
            });
        });

    return {
        subscribe(node, callback) {
            observer.observe(node);
            targetMap.set(node, callback);
        },
        unsubscribe(node) {
            observer.unobserve(node);
            targetMap.delete(node);
        },
    };
}

function getResizeObserver() {
    if (resizeObserver) return resizeObserver;
    resizeObserver = createResizeObserver();
    return resizeObserver;
}

/**
 * Hook to track an element's size using the Resize Observer API
 * @returns {Array} - [targetRef, contentRect from a ResizeObserverEntry]
 */
export default function useObservedSize() {
    const [size, setSize] = useState({ width: 0, height: 0 }),
        // utilize useState hook as a callback ref
        [target, targetRef] = useState(null);

    useLayoutEffect(() => {
        if (!target) return;
        // measure DOM element once after it is first added to the document
        setSize(target.getBoundingClientRect());
        // subscribe to the global resize observer
        getResizeObserver().subscribe(target, (entryRect) => {
            setSize(entryRect);
        });

        // return cleanup function that is called when target is removed from the dom
        // eslint-disable-next-line consistent-return
        return () => {
            // unsubscribe target from the global resize observer
            getResizeObserver().unsubscribe(target);
        };
    }, [target]);

    return [targetRef, size];
}