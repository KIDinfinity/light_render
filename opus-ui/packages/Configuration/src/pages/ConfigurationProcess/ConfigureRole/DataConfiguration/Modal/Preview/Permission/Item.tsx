import React from 'react';
import { Icon } from 'antd';
import { ReactComponent as RoleSvg } from 'configuration/assets/Role.svg';
import Ellipsis from '@/components/Ellipsis';
import styles from './Item.less';

export default ({ item, setRole }: any) => {
  return (
    <div className={styles.item}>
      <Ellipsis tooltip lines={1}>
        <span className={styles.ctn}> {item?.data?.name || ' '}</span>
      </Ellipsis>
      <Icon
        component={RoleSvg}
        className={styles.btnSetting}
        onClick={() => setRole && setRole(item)}
      />
    </div>
  );
};
