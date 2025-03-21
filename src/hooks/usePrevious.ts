import { useRef, useEffect } from 'react';

export const usePreviousState = (value: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
