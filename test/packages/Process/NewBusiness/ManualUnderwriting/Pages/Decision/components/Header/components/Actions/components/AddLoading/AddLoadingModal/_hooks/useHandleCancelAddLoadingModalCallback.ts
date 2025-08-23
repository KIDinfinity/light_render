import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/setAddLoadingModalVisible`,
      payload: {
        addLoadingModalVisible: false,
      },
    });
    dispatch({
      type: `${NAMESPACE}/clearAddingLoadingItems`,
    });
    dispatch({
      type: `${NAMESPACE}/clearAddingLoadingProduct`,
    });
  }, [dispatch]);
};
