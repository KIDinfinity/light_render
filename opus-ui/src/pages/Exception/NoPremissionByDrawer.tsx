import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './style.less';

const NoPremissionByDrawer = () => (
  <div className={styles.noPremissionByDrawer}>
    {formatMessageApi({ Label_COM_WarningMessage: 'MSG_000733' })}
  </div>
);

export default NoPremissionByDrawer;
