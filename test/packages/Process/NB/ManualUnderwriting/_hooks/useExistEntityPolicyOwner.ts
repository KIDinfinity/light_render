import { useMemo } from 'react';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import useGetIsCustomerIndividual from 'process/NB/hooks/useGetIsCustomerIndividual';

export default () => {
  const regionCode = tenant.region();
  const list = useGetClientDetailList();
  return useMemo(() => {
    const existEntityPolicyOwner = lodash
      .chain(list)
      .find((item: any) => {
        const isCompany = !useGetIsCustomerIndividual(item);
        const isPolicyOwner = lodash
          .chain(item)
          .get('roleList', [])
          .map((role: any) => role.customerRole)
          .includes(CustomerRole.PolicyOwner)
          .value();
        return isCompany && isPolicyOwner && regionCode === Region.PH;
      })
      .value();
    return existEntityPolicyOwner;
  }, [list, regionCode]);
};
