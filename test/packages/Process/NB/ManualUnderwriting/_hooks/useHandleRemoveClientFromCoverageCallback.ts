import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ insuredId, coverageId }: any) => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/deleteClient`,
      payload: {
        insuredId,
        coverageId,
      },
    });
  }, [dispatch, coverageId, insuredId]);
};
