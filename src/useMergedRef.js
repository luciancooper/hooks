import { useMemo } from 'react';

function setRef(ref, node) {
    if (typeof ref === 'function') {
        ref(node);
    } else if (ref && 'current' in ref) {
        ref.current = node;
    }
}

/**
 * Hook that merges two refs into a single memoized callback ref
 * @param {Ref} refA - An object or callback ref
 * @param {Ref} refB - An object or callback ref
 * @returns {Function} - merged callback ref
 */
export default function useMergedRef(refA, refB) {
    return useMemo(() => (
        (refA && refB)
            ? (value) => {
                setRef(refA, value);
                setRef(refB, value);
            }
            : (refA || refB)
    ), [refA, refB]);
}