import React from 'react';
import Ellipsis from '@/components/Ellipsis';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

export default ({ value }: any) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>
        {formatMessageApi({
          Label_BIZ_Individual: 'LAClientID',
        })}
      </span>
      <span className={styles.info}>
        <Ellipsis lines={1} tooltip forceTooltip>
          {value}
        </Ellipsis>
      </span>
    </div>
  );
};
