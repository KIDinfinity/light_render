import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();

  return useCallback(
    (id: string) => {
      dispatch({
        type: `${NAMESPACE}/deleteAgentItem`,
        payload: {
          id,
        },
      });
    },
    [dispatch]
  );
};
