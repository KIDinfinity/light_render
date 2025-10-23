import React from 'react';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import AuthorisedSignatory from '../AuthorisedSignatory';
import PersonalInfo from './PersonalInfo';
import NationalityInfo from './NationalityInfo';
import ContactInfo from './ContactInfo';
import FinancialInfo from './FinancialInfo';
import BackgroundInfo from './BackgroundInfo';
import CrsInfo from './CrsInfo';
// import CommonClientInfo from './CommonClientInfo'

import Name from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_component/ClientName';
import NewClientFlag from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_component/NewClientFlag';
import Roles from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_component/Roles';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import styles from './index.less';

const CustomerTypeTag = ({ clientId }: any) => {
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.customerType
  );

  return (
    customerType && (
      <div className={styles.customerType}>
        {formatMessageApi({ Dropdown_CLM_CustomerType: customerType })}
      </div>
    )
  );
};

const CommonClientInfo = ({ clientId }: any) => {
  return (
    <div className={styles.commonClientInfo}>
      <Name clientId={clientId} readOnly hasWarnIcon={true} />
      <div className={styles.tagList}>
        <NewClientFlag clientId={clientId} />
        <CustomerTypeTag clientId={clientId} />
        <Roles clientId={clientId} />
      </div>
    </div>
  );
};

export default ({ clientId }: any) => {
  return (
    <div className={styles.clientDetailRight}>
      <CommonClientInfo clientId={clientId} />
      <PersonalInfo clientId={clientId} />
      <BackgroundInfo clientId={clientId} />
      <NationalityInfo clientId={clientId} />
      <FinancialInfo clientId={clientId} />
      <ContactInfo clientId={clientId} />
      <CrsInfo clientId={clientId} />
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
