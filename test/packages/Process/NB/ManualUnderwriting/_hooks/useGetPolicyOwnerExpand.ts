import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import { NAMESPACE } from '../activity.config';

export default () => {
  const list = useGetClientDetailList();
  const expendedClient = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expendedClient,
    shallowEqual
  );
  const policyOwnerId = lodash
    .chain(list)
    .find((item: any) => {
      const roleList = lodash
        .chain(item)
        .get('roleList')
        .map((role: any) => role.customerRole)
        .value();
      return lodash.includes(roleList, CustomerRole.PolicyOwner);
    })
    .get('id')
    .value();

  return useMemo(() => {
    return expendedClient === policyOwnerId;
  }, [expendedClient, policyOwnerId]);
};
