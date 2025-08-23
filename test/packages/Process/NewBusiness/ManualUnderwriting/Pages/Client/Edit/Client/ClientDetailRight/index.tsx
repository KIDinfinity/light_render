import React from 'react';

import AuthorisedSignatory from '../AuthorisedSignatory';
import PersonalInfo from './PersonalInfo';
import NationalityInfo from './NationalityInfo';
import ContactInfo from './ContactInfo';
import FinancialInfo from './FinancialInfo';
import BackgroundInfo from './BackgroundInfo';
import OtherInfo from './OtherInfo';
import RiskIndicatorInfo from './RiskIndicatorInfo';

import styles from './index.less';

export default ({ clientId }: any) => {
  return (
    <div className={styles.clientDetailRight}>
      <PersonalInfo clientId={clientId} />
      <NationalityInfo clientId={clientId} />

      <FinancialInfo clientId={clientId} />
      <RiskIndicatorInfo clientId={clientId} />
      <ContactInfo clientId={clientId} />
      <BackgroundInfo clientId={clientId} />
      <OtherInfo clientId={clientId} />
      <AuthorisedSignatory clientId={clientId} />
    </div>
  );
};

export const ClientDetailRightOfAuthorisedSignatory = ({clientId}: any) => {
  return (
    <div className={styles.clientDetailRight}>
      <PersonalInfo clientId={clientId} />
      <NationalityInfo clientId={clientId} />
      <FinancialInfo clientId={clientId} />
    </div>
  );
}
