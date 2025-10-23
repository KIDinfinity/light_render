import lodash from 'lodash';

import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import useGetIsCustomerIndividual from 'process/NB/hooks/useGetIsCustomerIndividual';

export default () => {
  const clientDetailList = useGetClientDetailList();

  const customer = lodash.find(clientDetailList, (item: any) => {
    return lodash.some(item?.roleList, (role) => role.customerRole === CustomerRole.PolicyOwner);
  });

  return !useGetIsCustomerIndividual(customer);
};
