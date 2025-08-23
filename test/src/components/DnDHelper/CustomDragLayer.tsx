import React from 'react';
import { DragLayer } from 'react-dnd';
import classNames from 'classnames';
import { getNativeElememt } from './ItemTypes';
import styles from './CustomDragLayer.less';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 1010,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};
function getItemStyles(props) {
  const { initialOffset, currentOffset, item } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  const { width, height } = item;

  return {
    transform,
    WebkitTransform: transform,
    width,
    height,
  };
}
function getDragLayerContent(props) {
  const { item, isDragging } = props;
  const NativeElement = getNativeElememt({ ...item, isDragging });
  switch (item.sourcetype) {
    case 1:
    case 3:
      return (
        <table
          style={{
            background: 'var(--primary-color)',
            width: '100%',
            opacity: 0.45,
          }}
        >
          <tbody className={classNames('ant-table-tbody', styles.table_drag_preview)}>
            {NativeElement}
          </tbody>
        </table>
      );
    case 2:
    case 4:
      return NativeElement;
    default:
      return null;
  }
}
const CustomDragLayer = (props) => {
  const { isDragging } = props;

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles} id="getInitialSourceClientOffset">
      <div style={getItemStyles(props)}>{getDragLayerContent(props)}</div>
    </div>
  );
};
export default DragLayer((monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))(CustomDragLayer);
