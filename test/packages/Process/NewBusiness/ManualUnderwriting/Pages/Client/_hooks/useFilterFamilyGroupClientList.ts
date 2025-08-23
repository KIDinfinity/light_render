import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import { useGetHasFamilyGroupInd } from 'process/NewBusiness/ManualUnderwriting/_hooks';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default (list: string[]) => {
  const hasFamilyGroupInd = useGetHasFamilyGroupInd();
  const clientMap = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace?.entities?.clientMap,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(list)
      .filter((id: any) => {
        const roleList = clientMap?.[id]?.personalInfo?.customerRole as any[];
        return (
          hasFamilyGroupInd || !lodash.includes(roleList, CustomerRole.HealthFamilySharingMember)
        );
      })
      .value();
  }, [clientMap, hasFamilyGroupInd, list]);
};
