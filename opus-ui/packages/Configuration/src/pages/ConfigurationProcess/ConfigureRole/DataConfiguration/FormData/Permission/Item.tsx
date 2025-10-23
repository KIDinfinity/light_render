import React from 'react';
import { Icon } from 'antd';
import { ReactComponent as RoleSvg } from 'configuration/assets/Role.svg';
import ItemWrapTooltip from 'configuration/components/Modal/ItemWrapTooltip';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import { useSelector } from 'dva';
import styles from './Item.less';

export default ({ item, getCurrent, setRole }: any) => {
  const title = formatMessageApi({
    Label_COM_ConfigurationCenter: 'AssociatedRole',
  })
  const { allRoleLists } = useSelector((state: any) => state.configureRoleController);
  return (
    <div className={classNames(styles.itemWrap, {
      [styles.active]: getCurrent(item),
    })}
      onClick={() => setRole && setRole(item)}
    >
      <div
        className={styles.item}
      >
        <span>{item?.data?.name}</span>
      </div>
      <ItemWrapTooltip list={allRoleLists?.[item?.data?.permission_code]} title={title} code='role_code' name='role_name' >
        <Icon
          component={RoleSvg}
          className={styles.btnSetting}
        />
      </ItemWrapTooltip>
    </div >
  );
};
