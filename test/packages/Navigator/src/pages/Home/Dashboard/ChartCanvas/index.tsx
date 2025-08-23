import React from 'react';
import { CanvasId } from '../Enum';
import styles from './index.less';

export default () => {
  return <canvas id={CanvasId} className={styles.canvas} />;
};
