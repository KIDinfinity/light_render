import React from 'react';
import styles from './index.less';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import { NAMESPACE } from '../../activity.config';
import classNames from 'classnames';

export default function LoopBox({ id }) {
  const { name, roles } =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.sortRoleByClientId?.[id]
    ) || {};
  return (
    <div className={styles.nameRole}>
      <div className={classNames(styles.userName, `selectBox_${roles?.[0]}`)}>{name}</div>
      <div className={styles.roleList}>
        {lodash
          .chain(roles)
          .map((roleItem: any) => (
            <div className={styles.role} key={roleItem}>
              <div className={styles.flag} />
              {formatMessageApi({
                [roleItem === 'SA' ? 'Dropdown_SRV_AgentType' : 'Dropdown_CLM_CustomerRole']:
                  roleItem,
              })}
            </div>
          ))
          .value()}
      </div>
    </div>
  );
}
