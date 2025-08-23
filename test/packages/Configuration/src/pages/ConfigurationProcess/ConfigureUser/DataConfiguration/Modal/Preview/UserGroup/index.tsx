import React from 'react';
import Section from 'configuration/components/Modal/Preview/Section';
import Role from 'configuration/components/Modal/Preview/UserGroup/Role';
import Permission from 'configuration/components/Modal/Preview/UserGroup/Permission';
import Title from './Title';
import Empty from '@/components/Empty';
import lodash, { isEmpty } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

export default ({ groupData, onOpenUser, onOpenSetting }: any) => {
  return (
    <>
      {lodash.map(groupData, (item: any) => (
        <Section
          title={formatMessageApi({
            Label_COM_General: 'UserGroup',
          })}
          key={item?.data?.groupCode}
        >
          {!isEmpty(item?.subSection) && (
            <Title groupData={item?.data} onOpenUser={onOpenUser} onOpenSetting={onOpenSetting} />
          )}
          <div className={styles.content}>
            {lodash.map(item?.subSection, (role: any) => (
              <Role key={role?.data?.roleCode} roleData={role?.data} onOpenSetting={onOpenSetting} >
                <Permission permissionData={role?.subSection} />
              </Role>
            ))}
            {isEmpty(item?.subSection) && <Empty />}
          </div>
        </Section>
      ))}
    </>
  );
};
