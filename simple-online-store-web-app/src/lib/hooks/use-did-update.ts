import { DependencyList, useEffect, useRef } from "react";

export const useDidUpdate = (callback: () => void, deps: DependencyList) => {
  const mounted = useRef(false);
  const fnRef = useRef(callback);

  useEffect(() => {
    fnRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (mounted.current) {
      fnRef.current();
    }

    mounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
