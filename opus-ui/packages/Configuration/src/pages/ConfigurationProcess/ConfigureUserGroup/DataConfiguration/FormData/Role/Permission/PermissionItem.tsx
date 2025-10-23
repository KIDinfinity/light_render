import React from 'react';
import classnames from 'classnames';
import styles from './PermissionItem.less';


export default ({ item }: any) => {
  return (
    <div className={classnames(styles.item)} key={item?.code}>
      {item?.name}
    </div>
  );
};
