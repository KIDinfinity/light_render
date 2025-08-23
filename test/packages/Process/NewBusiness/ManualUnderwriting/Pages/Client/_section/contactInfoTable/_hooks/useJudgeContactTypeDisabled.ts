import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import CustomerRole from 'process/NewBusiness/Enum/CustomerRole';
import CustomerTypeEnum from 'process/NewBusiness/ManualUnderwriting/_enum/CustomerTypeEnum';

export default ({ readOnly, id, contactId }: any) => {
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.personalInfo.customerRole`
          : `modalData.entities.clientMap.${id}.personalInfo.customerRole`
      ),
    shallowEqual
  );
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.personalInfo.customerType`
          : `modalData.entities.clientMap.${id}.personalInfo.customerType`
      ),
    shallowEqual
  );
  const contactSeqNum = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.contactInfoMap.${contactId}.contactSeqNum`
          : `modalData.entities.contactInfoMap.${contactId}.contactSeqNum`
      ),
    shallowEqual
  );
  return tenant.region({
    [Region.PH]: () => {
      return (
        contactSeqNum < 2 &&
        formUtils.queryValue(customerType) === CustomerTypeEnum?.Company &&
        lodash.includes(formUtils.queryValue(customerRole), CustomerRole.PolicyOwner)
      );
    },
    notMatch: false,
  });
};
