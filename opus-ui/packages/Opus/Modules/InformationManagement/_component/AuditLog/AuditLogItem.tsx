import React from 'react';
import { Avatar } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Content from './Content';
import styles from './AuditLogItem.less';
import { getFirstLetters, getRandomColor } from 'opus/Utils';
import { useSelector } from 'dva';
import NAMESPACE from '../../_models/namespace';

export default ({ item }: any) => {
  const colorDict = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.colorDict
  );
  const { action, procActivityKey, operaor, operatorId } = item;
  return (
    <div className={styles.auditLogItem}>
      <div className={styles.auditLogItemTitle}>
        <div className={styles.actionClass}>
          {formatMessageApi({
            Label_BIZ_Claim: `app.navigator.drawer.auditLog.trigger.${action}`,
          })}
        </div>
        <div className={styles.changeClass}>{formatMessageApi({ activity: procActivityKey })}</div>
        <div className={styles.oparatorClass}>
          <Avatar
            shape="circle"
            size={20}
            style={{ backgroundColor: colorDict[operatorId] || getRandomColor() }}
            className={styles.auditLogAvatar}
          >
            {getFirstLetters(operaor)}
          </Avatar>
          {operaor}
        </div>
      </div>
      <div className={styles.auditLogItemBody}>
        <Content item={item} />
      </div>
    </div>
  );
};
