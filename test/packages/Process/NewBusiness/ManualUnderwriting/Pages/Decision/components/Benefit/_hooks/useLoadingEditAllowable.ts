import useLoadingAllowableConditions from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useLoadingAllowableConditions.ts';
import { useMemo } from 'react';
import { chain } from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default (loadingId, indicator, value) => {
  const addingLoadingItems = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addingLoadingItems,
    shallowEqual
  );
  const loadingItem = useMemo(
    () =>
      chain(addingLoadingItems)
        .find((item) => item.id === loadingId)
        .value(),
    [addingLoadingItems, loadingId]
  );
  return useLoadingAllowableConditions(loadingItem?.code, indicator, value);
};
