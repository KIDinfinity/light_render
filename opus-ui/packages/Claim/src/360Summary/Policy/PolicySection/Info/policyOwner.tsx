import React from 'react';
import classNames from 'classnames';
import DataLayout from '@/components/DataLayout';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { GenderCode } from 'claim/enum/GenderCode';
import { formatDate } from '../../../Utils';

import styles from './info.less';

const { DataItem } = DataLayout;

export default ({ concatName, policyOwner }: any) => {
  return (
    <DataLayout
      className={classNames(styles.policyOwner, styles.start)}
      span={12}
      onClick={(e) => e.stopPropagation()}
    >
      <div span={24} className={styles.layout}>
        <span>{concatName(policyOwner)}</span>
      </div>
      {policyOwner?.gender !== GenderCode.Company && (
        <div span={24} className={styles.layout}>
          <div className={styles.item}>{formatMessageApi({ Gender: policyOwner?.gender })}</div>
          <div className={styles.item}>
            {policyOwner?.dateOfBirth && formatDate(policyOwner?.dateOfBirth)}
          </div>
          <div className={styles.item}>{policyOwner?.position && policyOwner?.position}</div>
        </div>
      )}
      <DataItem title={formatMessageApi({ Label_BIZ_Policy: 'PolicyOwnerID' })}>
        {policyOwner?.clientId && policyOwner?.clientId}
      </DataItem>
      <DataItem title={formatMessageApi({ Label_BIZ_Individual: 'phoneNo' })}>
        {policyOwner?.phoneNo && policyOwner?.phoneNo}
      </DataItem>
      <DataItem title={formatMessageApi({ Label_BIZ_Individual: 'email' })}>
        {policyOwner?.email && policyOwner?.email}
      </DataItem>
      <DataItem span={24} title={formatMessageApi({ Label_BIZ_Individual: 'ContactAddr' })}>
        {policyOwner?.address && policyOwner?.address}
      </DataItem>
    </DataLayout>
  );
};
