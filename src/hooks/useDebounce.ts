import { useRef, useEffect, useCallback } from 'react';

export const useDebounce = <F extends (...args: any) => any>(
  func: F,
  waitFor: number,
): ((...args: Parameters<F>) => ReturnType<F>) => {
  const timeout = useRef<NodeJS.Timeout | null>();
  const savedFunc = useRef<F | null>(func);

  useEffect(() => {
    savedFunc.current = func;
  }, [waitFor]);

  return useCallback((...args: any) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    timeout.current = setTimeout(() => savedFunc.current?.(...args), waitFor);
  }, []) as (...args: Parameters<F>) => ReturnType<F>;
};
