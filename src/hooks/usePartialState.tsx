import { useState } from 'react';

/**
 * Wrapper around useState which allows partial updates. Useful when maintaining several
 * different states which should be independently updated within a single render.
 *
 * @param defaultState
 * @param callback callback to perform on state update
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function usePartialState<T extends Record<string, any>>(
  defaultState: T,
  callback?: (a: T) => void
): [T, (s: Partial<T>) => void, (reducer: Reducer<T>) => void] {
  const [state, setState] = useState<T>(defaultState);
  return [
    state,
    (partialState: Partial<T>) =>
      setState(currentState => {
        const newState = { ...currentState, ...partialState };
        callback && callback(newState);
        return newState;
      }),
    (reducer: Reducer<T>) =>
      setState(currentState => ({ ...currentState, ...reducer(currentState) })),
  ];
}

type Reducer<T> = (s: T) => Partial<T>;
