import { useCallback } from 'react';
import useGetSuspectClient from 'process/NB/CustomerIdentification/_hooks/useGetSuspectClient';
import useGetMismatchClient from 'process/NB/CustomerIdentification/_hooks/useGetMismatchClient';
import useGetFullyClient from 'process/NB/CustomerIdentification/_hooks/useGetFullyClient';
import CustomerRole from 'process/NB/Enum/CustomerRole';
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
