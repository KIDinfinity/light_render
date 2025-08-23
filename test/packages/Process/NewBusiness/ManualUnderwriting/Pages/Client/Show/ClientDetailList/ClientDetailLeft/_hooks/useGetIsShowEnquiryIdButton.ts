import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ clientId, enquiryId }: any) => {
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo.customerRole,
    shallowEqual
  );

  const displayUWMELink = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.displayUWMELink
  );
  const regionCode = tenant.region();
  const customerRoleList = formUtils.queryValue(customerRole);

  if (regionCode === Region.TH) {
    return false;
  }
  if (lodash.isEmpty(enquiryId)) {
    return false;
  }
  if (!displayUWMELink) {
    return false;
  }
  if (
    !lodash.includes(customerRoleList, 'CUS001') &&
    !lodash.includes(customerRoleList, 'CUS002')
  ) {
    return false;
  } else {
    return true;
  }
};
