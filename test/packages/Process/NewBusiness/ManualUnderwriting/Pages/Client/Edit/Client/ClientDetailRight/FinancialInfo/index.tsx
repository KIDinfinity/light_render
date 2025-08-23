import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section from './Section';
import FinancialSection from './FinancialSection';

export default ({ clientId }: any) => {
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities.clientMap?.[clientId]?.personalInfo?.customerRole
  );
  const isExistRole = !lodash.isEmpty(formUtils.queryValue(customerRole));
  return isExistRole ? (
    <>
      <Section clientId={clientId} />
      <FinancialSection clientId={clientId} />
    </>
  ) : null;
};
