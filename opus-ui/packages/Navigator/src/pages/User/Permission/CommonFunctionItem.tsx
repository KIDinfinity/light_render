import React from 'react';
import styles from './CommonFunctionItem.less';

export default ({ item }) =>
  item.formatName && (
    <div className={styles.block}>
      <i className={styles.circle} />
      <span>{item.formatName}</span>
    </div>
  );
