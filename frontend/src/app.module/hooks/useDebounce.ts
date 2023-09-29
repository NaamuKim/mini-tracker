import { useCallback, useRef } from "react";

const useDebounce = (delay: number = 300) => {
  const handlerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounce = useCallback(
    (callback: () => void) => {
      if (handlerRef.current) {
        clearTimeout(handlerRef.current);
      }

      handlerRef.current = setTimeout(() => {
        callback();
      }, delay);
    },
    [delay],
  );

  return debounce;
};

export default useDebounce;
