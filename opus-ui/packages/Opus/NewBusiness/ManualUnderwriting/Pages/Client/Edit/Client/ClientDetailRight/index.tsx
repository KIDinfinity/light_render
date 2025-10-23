import React from 'react';
import Name from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_component/ClientName';
import AuthorisedSignatory from '../AuthorisedSignatory';
import CommonClientInfo from './CommonClientInfo';
import PersonalInfo from './PersonalInfo';
import NationalityInfo from './NationalityInfo';
import ContactInfo from './ContactInfo';
import FinancialInfo from './FinancialInfo';
import FigureInfo from './FigureInfo';
import BackgroundInfo from './BackgroundInfo';
import CrsInfo from './CrsInfo';
import FatcaInfo from './FatcaInfo';

import styles from './index.less';
import UBOInfo from './UBOInfo';
import AuthorisedPersonInfo from './AuthorisedPersonInfo';
import DirectorAndControlPersonInfo from './DirectorAndControlPersonInfo';
import CorporateContactInfo from './CorporateContactInfo';
import CorporateInfo from './CorporateInfo';

export default ({ clientId }: any) => {
  return (
    <div className={styles.clientDetailRight}>
      <Name clientId={clientId} readOnly />
      <CommonClientInfo clientId={clientId} />
      <PersonalInfo clientId={clientId} />
      <CorporateInfo clientId={clientId} />
      <FigureInfo clientId={clientId} />
      <NationalityInfo clientId={clientId} />
      <FinancialInfo clientId={clientId} />
      <ContactInfo clientId={clientId} />
      <CorporateContactInfo clientId={clientId} />
      <BackgroundInfo clientId={clientId} />
      <CrsInfo clientId={clientId} />
      <FatcaInfo clientId={clientId} />
      <UBOInfo clientId={clientId} />
      <AuthorisedPersonInfo clientId={clientId} />
      <DirectorAndControlPersonInfo clientId={clientId} />
      <AuthorisedSignatory clientId={clientId} />
    </div>
  );
};

export const ClientDetailRightOfAuthorisedSignatory = ({ clientId }: any) => {
  return (
    <div className={styles.clientDetailRight}>
      <PersonalInfo clientId={clientId} />
      <NationalityInfo clientId={clientId} />
      <FinancialInfo clientId={clientId} />
    </div>
  );
};
