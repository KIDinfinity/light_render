import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useMemo } from 'react';
import CustomerRole from 'basic/enum/CustomerRole';
import { formUtils } from 'basic/components/Form';

export default ({ clientId }: { clientId: string }) => {
  const customerRole = useSelector(
    (state: any) =>
      lodash.get(
        state,
        `${NAMESPACE}.modalData.entities.clientMap.${clientId}.personalInfo.customerRole`
      ),
    shallowEqual
  );

  return useMemo(
    () => lodash.isEqual([CustomerRole.CoInsured], formUtils.queryValue(customerRole)),
    [customerRole]
  );
};
