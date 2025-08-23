import React from 'react';
import styles from './index.less';

export default function Required({ visible }) {
  return visible ? <div className={styles.required}>*</div> : <></>;
}
