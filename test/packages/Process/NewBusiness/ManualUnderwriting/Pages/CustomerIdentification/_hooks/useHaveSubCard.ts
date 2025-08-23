import { useMemo } from 'react';

import CustomerRole from 'process/NB/Enum/CustomerRole';
import lodash from 'lodash';
import { useGetClientDetailList } from 'process/NewBusiness/ManualUnderwriting/_hooks';

export default () => {
  const list = useGetClientDetailList();
  return useMemo(() => {
    return lodash
      .chain(list)
      .find((item: any) =>
        lodash
          .chain(item)
          .get('roleList')
          .map((role: any) => role.customerRole)
          .includes(CustomerRole.AuthorisedSignatory)
          .value()
      )
      .value();
  }, [list]);
};
