import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  return useCallback(
    ({ e, isSelected }: any) => {
      dispatch({
        type: `${NAMESPACE}/setPossibleSusOptNamesSelected`,
        payload: {
          value: e,
          isSelected,
        },
      });
    },
    [dispatch]
  );
};
