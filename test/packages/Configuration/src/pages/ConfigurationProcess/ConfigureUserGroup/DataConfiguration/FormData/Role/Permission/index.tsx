import React from 'react';
import Empty from '@/components/Empty';
import lodash, { isEmpty } from 'lodash';
import PermissionItem from './PermissionItem';
import styles from './index.less';

export default ({ permissionData }: any) => {
  return (
    <div className={styles.role}>
      <div className={styles.content}>
        {lodash.map(permissionData, (item: any, index: number) =>
          !isEmpty(item?.data) ? (
            <div className={styles.roleItem} key={`${index}${item?.data?.code}`}>
              <PermissionItem item={item?.data} />
            </div>
          ) : (
            <Empty className={styles.empty} key={`${index}${item?.data?.code}`} />
          )
        )}
        {isEmpty(permissionData) && <Empty />}
      </div>
    </div>
  );
};
