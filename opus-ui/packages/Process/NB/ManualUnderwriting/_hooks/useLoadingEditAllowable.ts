import useLoadingAllowableConditions from 'process/NB/ManualUnderwriting/_hooks/useLoadingAllowableConditions';
import useGetAddingLoadingItems from 'process/NB/ManualUnderwriting/_hooks/useGetAddingLoadingItems';
import { useMemo } from 'react';
import { chain } from 'lodash';

export default (loadingId, indicator, value) => {
  const addingLoadingItems = useGetAddingLoadingItems();
  const loadingItem = useMemo(
    () =>
      chain(addingLoadingItems)
        .find((item) => item.id === loadingId)
        .value(),
    [addingLoadingItems, loadingId]
  );
  return useLoadingAllowableConditions(loadingItem?.code, indicator, value);
};
