import { useMemo } from 'react';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import CustomerTypeEnum from 'process/NB/ManualUnderwriting/Enum/CustomerTypeEnum';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import { formUtils } from 'basic/components/Form';

export default () => {
  const regionCode = tenant.region();
  const list = useGetClientDetailList();
  return useMemo(() => {
    const existEntityPolicyOwner = lodash
      .chain(list)
      .find((item: any) => {
        const isPersonal =
        formUtils.queryValue(lodash.get(item, 'customerType')) === CustomerTypeEnum?.Personal
        const isPolicyOwner = lodash
        .chain(item)
        .get('roleList', [])
        .map((role: any) => role.customerRole)
        .includes(CustomerRole.PolicyOwner)
        .value();
        return isPersonal && isPolicyOwner && regionCode === Region.PH;
      })
      .value();
    return existEntityPolicyOwner;
  }, [list, regionCode]);
};
