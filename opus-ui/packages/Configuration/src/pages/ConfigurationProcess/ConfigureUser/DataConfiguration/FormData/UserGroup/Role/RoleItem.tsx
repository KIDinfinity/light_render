import React, { useState } from 'react';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import {  useSelector } from 'dva';
import SectionModal from '../SectionModal';
import styles from './RoleItem.less';


export default ({ item }: any) => {
  const { allRolePermissions } = useSelector((state: any) => state.configureUserController);
  const [active, setActive] = useState(false);
  const title = formatMessageApi({ Label_COM_ConfigurationCenter: 'AssociatedPermission' })
  const onMouseEnter = () => {
    setActive(true)
  }
  const onMouseLeave = () => {
    setActive(false)
  }
  return (
    <SectionModal list={allRolePermissions?.[item?.role_code]?.subSection} title={title}  code='data.code' name='data.name'>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={classnames(styles.item, active ? styles.active : '')} key={item?.role_code}>
        {item?.role_name}
      </div>
    </SectionModal>
  );
};

