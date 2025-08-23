import React from 'react';
import classname from 'classnames';
import Ellipsis from '@/components/Ellipsis';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './info.less';

export default ({ value }: any) => {
  return (
    <div className={classname(styles.container, styles.clientId)}>
      <span className={styles.label}>
        {formatMessageApi({
          Label_BIZ_Individual: 'CCRClientID',
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
