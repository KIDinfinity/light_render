import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  return useCallback(async () => {
    await dispatch({
      type: `${NAMESPACE}/confirmAddLoadingItems`,
    });
    await dispatch({
      type: `${NAMESPACE}/setAddLoadingModalVisible`,
      payload: {
        addLoadingModalVisible: false,
      },
    });
    await dispatch({
      type: `${NAMESPACE}/supplyUwDecisionEditInd`,
    });
  }, [dispatch]);
};
