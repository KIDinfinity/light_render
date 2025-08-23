import { useMemo } from 'react';
import lodash from 'lodash';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import useGetHasFamilyGroupInd from 'process/NB/ManualUnderwriting/_hooks/useGetHasFamilyGroupInd';

export default (list: any[]) => {
  const hasFamilyGroupInd = useGetHasFamilyGroupInd();

  return useMemo(() => {
    return lodash
      .chain(list)
      .filter((item: any) => {
        const roleList = lodash
          .chain(item)
          .get('roleList')
          .map((role: any) => role?.customerRole)
          .value();

        return (
          hasFamilyGroupInd || !lodash.includes(roleList, CustomerRole.HealthFamilySharingMember)
        );
      })
      .value();
  }, [hasFamilyGroupInd, list]);
};
