import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import CustomerRole from 'process/NB/Enum/CustomerRole';

export default () => {
  const list = useGetClientDetailList();
  return useMemo(() => {
    return lodash
      .chain(list)
      .filter((item: any) => {
        const roleList = lodash
          .chain(item)
          .get('roleList')
          .map((role: any) => role?.customerRole)
          .value();

        return !lodash.isEqual([CustomerRole.AuthorisedSignatory], roleList);
      })
      .value();
  }, [list]);
};
