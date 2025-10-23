import React from 'react';
import { useSelector } from 'dva';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import ContactItem from './ContactItem';
import styles from './index.less';

export default ({ clientId }: any) => {
  const contactInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.contactInfoList
  );

  return tenant.region() !== Region.KH ? (
    <div className={styles.tableSection}>
      {contactInfoList?.map((id: string) => {
        return <ContactItem clientId={clientId} id={id} key={id} />;
      })}
    </div>
  ) : null;
};
