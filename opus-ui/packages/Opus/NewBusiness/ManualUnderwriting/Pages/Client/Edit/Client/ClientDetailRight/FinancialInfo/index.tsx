import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import Section from './Section';
import FinancialSection from './FinancialSection';

export default ({ clientId }: any) => {
  const customerRole = useSelector((state: any) =>
    lodash.get(
      state,
      `${NAMESPACE}.modalData.entities.clientMap.${clientId}.personalInfo.customerRole`
    )
  );
  const isExistRole = !lodash.isEmpty(formUtils.queryValue(customerRole));
  return isExistRole ? (
    <>
      <Section clientId={clientId} />
      <FinancialSection clientId={clientId} />
    </>
  ) : null;
};
