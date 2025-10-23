import React from 'react';

export default ({ children, display }: any) => {
  const trackRef = React.useRef();
  const handleChangeMove = React.useCallback((e) => {
    const newStyle = `--positionX: ${Math.min(
      Math.max(e.clientX + 20, 0),
      document.body.clientWidth - 400
    )}px; --positionY: ${Math.min(
      Math.max(e.clientY + 30, 0),
      document.body.clientHeight - 100
    )}px;`;
    trackRef.current.setAttribute('style', newStyle);
  }, []);
  const containerProps = (() => {
    const defaultProps = {
      children,
    };
    if (display) {
      return {
        ...defaultProps,
        style: {
          '--positionX': '-500px',
          '--positionY': '-500px',
        },
        ref: trackRef,
        onMouseMove: handleChangeMove,
      };
    }
    return defaultProps;
  })();
  return <>{React.createElement('div', containerProps)}</>;
};
