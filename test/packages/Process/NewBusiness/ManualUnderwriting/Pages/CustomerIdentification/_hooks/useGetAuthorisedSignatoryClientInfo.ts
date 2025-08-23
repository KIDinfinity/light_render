import { useCallback } from 'react';
import { useGetSuspectClient, useGetMismatchClient, useGetFullyClient } from './';

import CustomerRole from 'process/NewBusiness/Enum/CustomerRole';
import lodash from 'lodash';

export default ({ policy }: any) => {
  const misMatchClients = useGetMismatchClient({ policy });
  const FullyMatchClients = useGetFullyClient({ policy });
  return useCallback(
    ({ isRequestClientsDetail }) => {
      const list = (() => {
        if (isRequestClientsDetail) {
          return useGetSuspectClient({
            policy,
          });
        } else {
          return [...misMatchClients, ...FullyMatchClients];
        }
      })();
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
    },
    [FullyMatchClients, misMatchClients, policy]
  );
};
