import React from 'react';
import { useSelector } from 'dva';
import classnames from 'classnames';

import { tenant, Region } from '@/components/Tenant';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import AuthorisedSignatory from '../AuthorisedSignatory';
import PersonalInfo from './PersonalInfo';
import AbridgedPersonInfo from './PersonalInfo/abridgedPerson';
import NationalityInfo from './NationalityInfo';
import ContactInfo from './ContactInfo';
import FinancialInfo from './FinancialInfo';
import RiskIndicatorInfo from './RiskIndicatorInfo';
import BackgroundInfo from './BackgroundInfo';
import OtherInfo from './OtherInfo';
import TagList from './TagList';

import styles from './index.less';

export default ({ clientId }: any) => {
  return (
    <div className={styles.clientDetailRight}>
      <PersonalInfo clientId={clientId} />
      <NationalityInfo clientId={clientId} />
      <FinancialInfo clientId={clientId} />
      <ContactInfo clientId={clientId} />
      <BackgroundInfo clientId={clientId} />
      <OtherInfo clientId={clientId} />
      <TagList clientId={clientId} />
      <RiskIndicatorInfo clientId={clientId} />
      <AuthorisedSignatory clientId={clientId} />
    </div>
  );
};

export const ClientDetailRightOfAuthorisedSignatory = ({ clientId }: any) => {
  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );

  return expandedClientId ? (
    <div className={classnames(styles.clientDetailRight, styles.abridged)}>
      <PersonalInfo clientId={clientId} />
      <NationalityInfo clientId={clientId} />
      {tenant.region({
        [Region.VN]: null,
        notMatch: () => {
          return expandedClientId ? <TagList clientId={clientId} /> : null;
        },
      })}
    </div>
  ) : (
    <div className={styles.clientDetailRight}>
      <AbridgedPersonInfo clientId={clientId} />
    </div>
  );
};
