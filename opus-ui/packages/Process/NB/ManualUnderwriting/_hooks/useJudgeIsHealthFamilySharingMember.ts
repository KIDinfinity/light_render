import { useMemo } from 'react';
import lodash from 'lodash';
import CustomerRole from 'process/NB/Enum/CustomerRole';

export default ({ roleList = [] }: any) => {
  return useMemo(() => {
    return lodash
      .chain(roleList)
      .some((item) => item?.customerRole === CustomerRole.HealthFamilySharingMember)
      .value();
  }, [roleList]);
};
