import React from 'react';
import { useSelector } from 'dva';

import { tenant, Region } from '@/components/Tenant';
import classnames from 'classnames';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import ContactItem from './ContactItem';
import ContactAdd from './ContactAdd';
import styles from './index.less';

export default ({ clientId }: any) => {
  const contactInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.contactInfoList
  );

  return tenant.region() !== Region.KH ? (
    <div className={styles.tableSection}>
      <div className={classnames(styles.title, styles.noIcon)}>Contact Info</div>
      {contactInfoList?.map((id: string) => {
        return <ContactItem clientId={clientId} id={id} key={id} />;
      })}
      <ContactAdd clientId={clientId} />
    </div>
  ) : null;
};
