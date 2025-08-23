import React from 'react';
import { Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

export default ({ roleData, onOpenSetting, children, onOpenUserGroup }: any) => {
  return (
    <div className={styles.role}>
      <div className={styles.roleTop}>
        <div className={styles.title}>
          {formatMessageApi({
            Label_COM_General: 'Role',
          })}
        </div>
        <div className={styles.content}>{roleData?.role_name}</div>
        {roleData && onOpenUserGroup && (
          <Icon type="team" className={styles.btnTeam} onClick={() => onOpenUserGroup(roleData)} />
        )}
        {roleData && (
          <Icon
            type="setting"
            className={styles.btnSetting}
            onClick={() => onOpenSetting && onOpenSetting(roleData, 'role')}
          />
        )}
      </div>
      <div className={styles.container}>{children}</div>
    </div>
  );
};
