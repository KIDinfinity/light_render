import { useMemo } from 'react';
import lodash from 'lodash';
import useGetContextRoles from 'process/NB/ManualUnderwriting/Client/ClientProvider/hooks/useGetContextRoles';
import CustomerRole from 'process/NB/Enum/CustomerRole';

export default () => {
  const roles = useGetContextRoles();

  return useMemo(() => {
    return lodash.includes(roles, CustomerRole.HealthFamilySharingMember);
  }, [roles]);
};
