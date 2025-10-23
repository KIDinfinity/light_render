import React from 'react';
import { useSelector } from 'dva';
import classnames from 'classnames';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import UserInfo from './UserInfo';
import AuthorisedSignatory from '../AuthorisedSignatory';
import PersonalInfo from './PersonalInfo';
import FigureInfo from './FigureInfo';
import AbridgedPersonInfo from './PersonalInfo/abridgedPerson';
import NationalityInfo from './NationalityInfo';
import ContactInfo from './ContactInfo';
import FinancialInfo from './FinancialInfo';
import BackgroundInfo from './BackgroundInfo';
import CrsInfo from './CrsInfo';
import FatcaInfo from './FatcaInfo';
import TagList from './TagList';
import RiskIndicator from './RiskIndicator';

import styles from './index.less';
import UBOInfo from './UBOInfo';
import AuthorisedPersonInfo from './AuthorisedPersonInfo';
import DirectorAndControlPersonInfo from './DirectorAndControlPersonInfo';
import CorporateInfo from './CorporateInfo';
import CorporateContactInfo from './CorporateContactInfo';

const BasicInfo = ({ clientId }: any) => {
  return (
    <div className={styles.clientDetailRight}>
      <UserInfo clientId={clientId} />
      <PersonalInfo clientId={clientId} />
      <FigureInfo clientId={clientId} />
      <NationalityInfo clientId={clientId} />
      <FinancialInfo clientId={clientId} />
      <ContactInfo clientId={clientId} />
      <CorporateInfo clientId={clientId} />
      <CorporateContactInfo clientId={clientId} />
      <BackgroundInfo clientId={clientId} />
      <UBOInfo clientId={clientId} />
      <AuthorisedPersonInfo clientId={clientId} />
      <DirectorAndControlPersonInfo clientId={clientId} />
      <TagList clientId={clientId} />
      <RiskIndicator clientId={clientId} />
      <CrsInfo clientId={clientId} />
      <FatcaInfo clientId={clientId} />
      <AuthorisedSignatory clientId={clientId} />
    </div>
  );
};

BasicInfo.displayName = 'basicInfo';

export default BasicInfo;
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
