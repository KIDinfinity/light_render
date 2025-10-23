import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  return useCallback(async () => {
    await dispatch({
      type: `${NAMESPACE}/updatePaymentListData`,
    });
  }, [dispatch]);
};
