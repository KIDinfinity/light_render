import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

export default () => {
  const dispatch = useDispatch();
  return useCallback(
    ({ exclusionItemId }) => {
      dispatch({
        type: `${NAMESPACE}/deleteExclusionItem`,
        payload: {
          exclusionItemId,
        },
      });
    },
    [dispatch]
  );
};
