import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import useGetClientDetailList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetClientDetailList.ts';
import CustomerRole from 'process/NewBusiness/Enum/CustomerRole';
import CustomerType from 'process/NewBusiness/Enum/CustomerType';

export default () => {
  const clientDetailList = useGetClientDetailList();

  const customerType = lodash.find(clientDetailList, (item: any) => {
    return lodash.some(item?.roleList, role => role.customerRole === CustomerRole.PolicyOwner);
  })?.customerType;

  return formUtils.queryValue(customerType) === CustomerType.Entity;

};

