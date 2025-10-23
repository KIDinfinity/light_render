import React from 'react';
import styles from './index.less';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default function LoopBox({ name, roleList }) {
  return (
    <div className={styles.nameRole}>
      <div className={styles.userName}>{name}</div>
      <div className={styles.roleList}>
        {lodash
          .chain(roleList)
          .map((roleItem: any) => (
            <div className={styles.role} key={roleItem}>
              <div className={styles.flag} />
              {formatMessageApi({
                [roleItem === 'SA'
                  ? 'Dropdown_SRV_AgentType'
                  : 'Dropdown_CLM_CustomerRole']: roleItem,
              })}
            </div>
          ))
          .value()}
      </div>
    </div>
  );
}
