import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ coverageId }: any) => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/addClient`,
      payload: {
        coverageId,
      },
    });
  }, [dispatch, coverageId]);
};
