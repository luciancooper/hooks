# @lcooper/hooks

[![npm][npm-badge]][npm-link]
[![license][license-badge]][license-link]

A collection of useful React hooks.

## Installation

```bash
npm install @lcooper/hooks
```

or

```bash
yarn add @lcooper/hooks
```

## Hooks

| Hook                                            | Description                                                   |
|:------------------------------------------------|:--------------------------------------------------------------|
| [`useLatest`](#uselatestvalue)                  | Hook that stores the most recent value in a ref               |
| [`usePrevious`](#usepreviousvalue-initialvalue) | Hook that returns a value from the previous render            |
| [`useMergedRef`](#usemergedrefrefa-refb)        | Hook that merges two refs into a single callback ref          |
| [`useObservedSize`](#useobservedsize)           | Hook to track an element's size using the Resize Observer API |

## API

### `useLatest(value)`

Hook that stores the most recent value in a ref, updating it at each invocation.

 - `value` - value to store

Returns: `RefObject`

#### Example

```js
import { useEffect } from 'react';
import { useLatest } from '@lcooper/hooks';

function useExample(arg) {
    const latest = useLatest(arg);

    useEffect(() => {
        // fetch something that takes a while...
        fetchSomething().then(() => {
            // use the latest value of arg
            console.log(latest.current);
        });
    }, [latest]);
}
```

### `usePrevious(value, initialValue)`

Hook that returns a value from the previous render.

 - `value` - current value
 - `initialValue` - initial value (optional)

Returns: previous `value`

#### Example

```js
import { useState } from 'react';
import { usePrevious } from '@lcooper/hooks';

function useCounter(initialCount) {
    const [count, setCount] = useState(initialCount),
        prevCount = usePrevious(count);
    return [count, prevCount, setCount];
}
```

### `useMergedRef(refA, refB)`

Hook that merges two refs into a single memoized callback ref.

 - `refA` - First `RefObject` or `RefCallback` to merge
 - `refB` - Second `RefObject` or `RefCallback` to merge
 
Returns: `RefCallback`

#### Example

```js
import { useRef, forwardRef } from 'react';
import { useMergedRef } from '@lcooper/hooks';

const Button = forwardRef(({ children, ...props }, ref) => {
    const innerRef = useRef(),
        mergedRef = useMergedRef(ref, innnerRef);
    return <button ref={mergedRef} {...props}>{children}</button>;
});
```

### `useObservedSize()`

Hook to track an element's size using the [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API). Returns a callback ref that must be attached to the element you wish to measure.

Returns `[ref: RefCallback, size: { width: number, height: number }]`

#### Example

```js
import { useObservedSize } from '@lcooper/hooks';

function Square() {
    const [ref, { width, height }] = useObservedSize();
    return (
        <div ref={ref} className='square'>
            Square size is {width} x {height}
        </div>
    );
}
```

[npm-link]: https://www.npmjs.com/package/@lcooper/hooks
[npm-badge]: https://img.shields.io/npm/v/@lcooper/hooks?logo=npm&style=for-the-badge
[license-link]: LICENSE
[license-badge]: https://img.shields.io/npm/l/@lcooper/hooks?color=brightgreen&style=for-the-badge
