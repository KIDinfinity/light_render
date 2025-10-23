import { useMemo } from 'react';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import useGetIsCustomerIndividual from 'process/NB/hooks/useGetIsCustomerIndividual';

export default ({ id }: any) => {
  const regionCode = tenant.region();
  const list = useGetClientDetailList();
  const currentClientInfo = useMemo(() => {
    return lodash.find(list, (client: any) => client.id === id);
  }, [id, list]);
  return useMemo(() => {
    const isCompany = !useGetIsCustomerIndividual(currentClientInfo);
    const isPolicyOwner = lodash
      .chain(currentClientInfo)
      .get('roleList', [])
      .map((role: any) => role.customerRole)
      .includes(CustomerRole.PolicyOwner)
      .value();
    return (isCompany || isPolicyOwner) && regionCode === Region.MY;
  }, [currentClientInfo, regionCode]);
};
