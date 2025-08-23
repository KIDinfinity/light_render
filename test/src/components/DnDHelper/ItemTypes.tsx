import React from 'react';

export default {
  ASSIGNEE: 'assignee',
  SEARCHFIELD: 'searchfield',
};

const getNativeElememt = ({ sourcetype, isDragging, ...res }, getDraggingRef) => {
  const style = { ...res.style, width: '100%', cursor: 'move', opacity: isDragging ? 0.45 : 1 };
  switch (sourcetype) {
    case 1:
    case 3:
      return <tr {...res} style={style} ref={getDraggingRef} />;
    case 2:
    case 4:
      return <div {...res} style={style} ref={getDraggingRef} />;
    default:
      return null;
  }
};

export { getNativeElememt };
