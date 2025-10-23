import React from 'react';
import classnames from 'classnames';
import LocationType from './LocationType';
import styles from './index.less';

const Border = ({ location, type }: any) => (
  <div
    className={classnames({
      [styles.colResize]: [LocationType.left, LocationType.right].includes(type),
      [styles.rowResize]: [LocationType.top, LocationType.bottom].includes(type),
      [styles.colResizeLeft]: type === LocationType.left,
      [styles.colResizeRight]: type === LocationType.right,
      [styles.rowResizeTop]: type === LocationType.top,
      [styles.rowResizeBottom]: type === LocationType.bottom,
    })}
    onMouseDown={(e) => {
      location.handleStartResize(e, type);
    }}
    onMouseUp={(e) => {
      location.handleEndResize(e);
    }}
  />
);

export default Border;
