import React from 'react';
import { Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import Ellipsis from '@/components/Ellipsis';
import styles from './index.less';
import SectionModal from '../SectionModal';

export default ({ groupData }: any) => {
  const { allGroupUsers } = useSelector((state: any) => state.configureUserGroupController);
  const title = formatMessageApi({ Label_COM_ConfigurationCenter: 'AssociatedUserGroup' });
  return (
    <div className={styles.title}>
      <div className={styles.content}>
        <Ellipsis tooltip lines={1}>
          {groupData?.role_name}
        </Ellipsis>
      </div>
      <SectionModal
        list={allGroupUsers?.[groupData?.role_code]}
        title={title}
        code="group_code"
        name="group_name"
        layout="twoColumns"
      >
        <div className={styles.btnUser}>
          {/* <Icon component={userSvg} /> */}
          <Icon type="team" />
        </div>
      </SectionModal>
    </div>
  );
};
