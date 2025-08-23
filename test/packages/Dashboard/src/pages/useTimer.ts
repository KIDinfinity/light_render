import { useEffect, useRef, useCallback } from 'react';

interface Options {
  frequency?: number; // default 10 minutes
  base?: string; // default base 1 mins
  off?: boolean; // off the timer
}

type Callback = () => void;

export default (callback: Callback, { frequency = 10, base = 'min', off = false }: Options) => {
  const Timer = useRef<any>(null);

  const defaultBase = base === 'min' ? 60000 : base === 'sec' ? 1000 : 1;

  const clearTimer = () => {
    if (Timer.current) {
      clearTimeout(Timer.current);
      Timer.current = null;
    }
  };
  const setTimer = useCallback(() => {
    clearTimer();
    Timer.current = setTimeout(() => {
      callback();
      console.log('refresh .....', `${frequency} ${base}`);
      setTimer();
    }, frequency * defaultBase);
  }, [callback]);

  useEffect(() => {
    if (off) {
      return;
    }
    setTimer();
    // eslint-disable-next-line consistent-return
    return () => {
      clearTimer();
    };
  }, []);

  return {
    isTiming: !!Timer.current,
    startTimer: setTimer,
    clearTimer,
  };
};
