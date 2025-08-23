import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './Item.less';

export default ({ typeCode, dictCode, onClick }: any) => (
  <div className={styles.item} onClick={() => onClick()}>
    <div className={styles.title}>{formatMessageApi({ [typeCode]: dictCode })}</div>
  </div>
);
