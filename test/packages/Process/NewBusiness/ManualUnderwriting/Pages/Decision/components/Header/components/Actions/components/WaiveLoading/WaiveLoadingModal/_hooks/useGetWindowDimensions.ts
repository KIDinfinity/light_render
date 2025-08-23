import { useState, useEffect } from 'react';

function getWindowDimensions({ maxWidth, maxHeight }: { maxWidth: number; maxHeight: number }) {
  let height = maxHeight,
    width = maxWidth,
    pLeft = 0,
    pTop = 0;
  const { innerWidth, innerHeight } = window;

  pLeft = 75;
  pTop = 50;
  height = innerHeight - 100;
  width = innerWidth - 150;

  if (innerWidth > maxWidth) {
    pLeft = (innerWidth - maxWidth) / 2;
    width = maxWidth;
  }
  if (innerHeight > maxHeight) {
    pTop = (innerHeight - maxHeight) / 2;
    height = maxHeight;
  }

  return {
    width,
    height,
    pLeft,
    pTop,
  };
}

export default function useWindowDimensions(
  props: { maxWidth: number; maxHeight: number } = { maxWidth: 1600, maxHeight: 900 }
) {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions(props));

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions(props));
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
