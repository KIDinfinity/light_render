import { useMemo } from 'react';
import lodash from 'lodash';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import CustomerType from 'process/NB/Enum/CustomerType';

export default ({ policy }: any) => {
  return useMemo(() => {
    return lodash
      .chain(policy)
      .get('clientInfoList')
      .find((client: any) => {
        const roleList = lodash
          .chain(client)
          .get('roleList')
          .map((role: any) => role?.customerRole)
          .value();
        return (
          lodash.includes(roleList, CustomerRole.PolicyOwner) &&
          client?.customerType === CustomerType.Entity
        );
      })
      .get('id')
      .value();
  }, [policy]);
};
