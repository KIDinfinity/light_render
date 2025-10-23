import React, { useState } from 'react';
import type { ResizableProps } from 'react-resizable';
import { Resizable } from 'react-resizable';

interface ComponetProps extends ResizableProps {
  onClick: Function;
}

function ResizableColumns(props: ComponetProps) {
  const [resizing, setResizing] = useState(false);
  const { onResize, width, onClick, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      onResizeStart={() => {
        setResizing(true)
      }}
      onResizeStop={() => {
        setTimeout(() => {
          setResizing(false)
        });
      }}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th
        onClick={(...args) => {
          if (!resizing && onClick) {
            onClick(...args);
          }
        }}
        {...restProps}
      />
    </Resizable>
  );

}
export default ResizableColumns;
