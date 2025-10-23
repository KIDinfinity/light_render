import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import CustomerRole from 'process/NB/Enum/CustomerRole';
export default ({ id }: any) => {
  const list = useGetClientDetailList();
  const presentClients = lodash.chain(list).find({ id }).value() || {};
  return useMemo(() => {
    return (
      lodash
        .chain(presentClients?.roleList || [])
        .reduce((unSelect: boolean, { customerRole }: any) => {
          return customerRole !== CustomerRole.Beneficiary ? true : unSelect;
        }, false)
        .value() || false
    );
  }, [presentClients]);
};
