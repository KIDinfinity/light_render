import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/confirmAddDPRemarkItems`,
    });
    dispatch({
      type: `${NAMESPACE}/setAddDPRemarkModalVisible`,
      payload: {
        addDPRemarkModalVisible: false,
      },
    });
  }, [dispatch]);
};
