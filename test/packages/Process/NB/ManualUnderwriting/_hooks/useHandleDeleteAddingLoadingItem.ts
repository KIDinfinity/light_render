import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

export default () => {
  const dispatch = useDispatch();
  return useCallback(
    ({ loadingItemId }) => {
      dispatch({
        type: `${NAMESPACE}/deleteLoadingItem`,
        payload: {
          loadingItemId,
        },
      });
    },
    [dispatch]
  );
};
