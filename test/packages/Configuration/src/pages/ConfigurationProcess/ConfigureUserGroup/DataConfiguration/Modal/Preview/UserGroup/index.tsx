import React from 'react';
import Empty from '@/components/Empty';
import lodash, { isEmpty } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import Section from 'configuration/components/Modal/Preview/Section';
import Role from 'configuration/components/Modal/Preview/UserGroup/Role';
import Permission from 'configuration/components/Modal/Preview/UserGroup/Permission';
import Title from './Title';
import styles from './index.less';

export default ({ groupData, onOpenUser, onOpenSetting, onOpenUserGroup }: any) => {
  const { userList } = useSelector((state: any) => state.configureUserGroupController);
  const { previewRecord } = useSelector((state: any) => state.configurationController);
  return (
    <>
      <Section
        title={formatMessageApi({
          Label_COM_General: 'UserGroup',
        })}
      >
        {!isEmpty(groupData) && (
          <Title
            userList={userList[previewRecord?.group_code]}
            groupData={groupData}
            onOpenUser={onOpenUser}
            onOpenSetting={onOpenSetting}
          />
        )}
        <div className={styles.content}>
          {lodash.map(groupData?.subSection, (role: any) => (
            <Role
              key={role?.data?.roleCode}
              roleData={role?.data}
              onOpenSetting={onOpenSetting}
              onOpenUserGroup={onOpenUserGroup}
            >
              <Permission permissionData={role?.subSection} />
            </Role>
          ))}
          {isEmpty(groupData?.subSection) && <Empty />}
        </div>
      </Section>
    </>
  );
};
