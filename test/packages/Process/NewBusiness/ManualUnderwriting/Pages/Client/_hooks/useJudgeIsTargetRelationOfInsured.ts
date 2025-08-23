import lodash from 'lodash';

import { tenant, Region } from '@/components/Tenant';

import CustomerRole from 'process/NewBusiness/Enum/CustomerRole';
import CustomerTypeEnum from 'process/NewBusiness/ManualUnderwriting/_enum/CustomerTypeEnum';

export default ({ form, relationOfInsuredOut, customerRoleOut, customerTypeOut }: any) => {
  return tenant.region({
    [Region.PH]: () => {
      const relationOfInsuredTargetList = ['CHIN', 'CHRH', 'ES'];
      const relationOfInsured = relationOfInsuredOut || form?.getFieldValue('relationOfInsured');
      const isPersonal = (customerTypeOut || form?.getFieldValue('customerType')) === CustomerTypeEnum?.Personal;
      const customerRole = customerRoleOut || form?.getFieldValue('customerRole');
      const isPolicyOwner = lodash.includes(customerRole, CustomerRole.PolicyOwner);
      const isTargetRelationOfInsured = lodash.includes(
        relationOfInsuredTargetList,
        relationOfInsured
      );

      return isPersonal && isPolicyOwner && isTargetRelationOfInsured;
    },
    notMatch: false,
  });
};
