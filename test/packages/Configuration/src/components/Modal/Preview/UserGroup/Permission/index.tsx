import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Empty from '@/components/Empty';
import { isEmpty } from 'lodash';
import styles from './index.less';

export default ({ permissionData }: any) => {
  return (
    <div className={styles.permission}>
      <div className={styles.title}>{formatMessageApi({ Label_COM_General: 'Permission' })}</div>
      <div className={styles.content}>
        {lodash.map(permissionData, (item: any) =>
          !isEmpty(item?.data) ? (
            <div className={styles.item} key={item.permissionCode}>
              {item?.data?.name}
            </div>
          ) : (
            <Empty />
          )
        )}
        {isEmpty(permissionData) && <Empty />}
      </div>
    </div>
  );
};
