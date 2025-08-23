import React from 'react';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './pendingMemo.less';
import classnames from 'classnames';

export default ({ list = [] }: any) => {
  return list.map((item: any, idx: number) => (
    <div className={classnames(styles.clientSection, styles.expandedDeleteList)} key={idx}>
      <div className={classnames(styles.sectionLeftIndicator, styles.greyIndicator)} />
      <span style={{ width: '15%' }} className={classnames(styles.waiveDesc)}>
        {item?.memoCode}
      </span>
      <span className={classnames(styles.waiveDesc)}>{item?.memoDesc}</span>
      <div className={styles.expandedWaive}>
        {formatMessageApi({
          Label_Sider_Envoy: 'MemoStatus03',
        })}
      </div>
    </div>
  ));
};
