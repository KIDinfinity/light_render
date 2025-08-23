import React from 'react';
import Ellipsis from '@/components/Ellipsis';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './info.less';

export default ({ value }: any) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>
        {formatMessageApi({
          Label_BIZ_Individual: 'LAClientID',
        })}
      </span>
      <Ellipsis lines={1} tooltip forceTooltip wrapperClass={styles.info}>
        {value}
      </Ellipsis>
    </div>
  );
};
