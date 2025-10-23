import React from 'react';
import { Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as userSvg } from 'configuration/assets/user.svg';
import {  useSelector } from 'dva';
import Ellipsis from '@/components/Ellipsis';
import styles from './index.less';
import SectionModal from '../SectionModal';

export default ({ groupData, onOpenUser }: any) => {
  const { allGroupUsers } = useSelector((state: any) => state.configureUserController);
  const title=formatMessageApi({Label_COM_ConfigurationCenter:'AssociatedUser'})
  return (
    <div className={styles.title}>
      <div className={styles.content}>
        <Ellipsis tooltip lines={1}>
          {groupData?.group_name}
        </Ellipsis>
      </div>
      <SectionModal list={allGroupUsers?.[groupData?.group_code]} title={title}  code='user_id' name='user_name' layout='twoColumns'>
        <div className={styles.btnUser} onClick={() => onOpenUser && onOpenUser(groupData)}>
          <Icon component={userSvg} />
        </div>
      </SectionModal>
    </div>

  );
};
