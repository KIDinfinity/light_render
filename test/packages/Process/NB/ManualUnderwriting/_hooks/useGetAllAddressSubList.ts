import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const allAddressSubList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allAddressSubList,
    shallowEqual
  );

  return useMemo(() => {
    return allAddressSubList;
  }, [allAddressSubList]);
};
