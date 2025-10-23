import React from 'react';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { Icon } from 'opus/Components/Antd';
import { ReactComponent as Graph } from 'opus/Assets/icon-graph.svg';

import styles from './Header.less';

export default ({ Actions }: any) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Icon component={Graph} className={styles.icon} />
        <span className={styles.text}>{formatMessageApi({ Label_COM_Opus: 'Overview' })}</span>
      </div>
      {Actions}
    </div>
  );
};
