import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

export default ({ roleList }: any) => {
  return (
    <div className={styles.roleList}>
      {lodash
        .chain(roleList)
        .filter((item) => item?.display)
        .map((roleItem: any) => (
          <div className={styles.role} key={roleItem?.id}>
            <div className={styles.flagView}>
              <div className={styles.flag} />
            </div>
            {formatMessageApi({ Dropdown_CLM_CustomerRole: roleItem.customerRole })}
          </div>
        ))
        .value()}
    </div>
  );
};
