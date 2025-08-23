import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ coreCode }: any) => {
  const ropListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.ropListMap,
    shallowEqual
  );

  return useMemo(() => {
    return coreCode ? ropListMap?.[coreCode] || [] : ropListMap;
  }, [ropListMap, coreCode]);
};
