import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';

export default ({ groupData, onOpenUser, onOpenSetting }: any) => {
  return (
    <div className={styles.title}>
      <div className={styles.content}>{groupData?.group_name}</div>
      <div className={styles.btnUser} onClick={() => onOpenUser && onOpenUser(groupData)}>
        <Icon type="user" />
      </div>
      <div className={styles.btnSetting} onClick={() => onOpenSetting && onOpenSetting(groupData,'group')}>
        <Icon type="setting" />
      </div>
    </div>
  );
};
