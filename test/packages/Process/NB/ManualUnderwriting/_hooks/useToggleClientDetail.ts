import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

export default ({ expand }: any) => {
  const dispatch = useDispatch();
  return useCallback(
    (id) => {
      if (expand) {
        return dispatch({
          type: `${NAMESPACE}/closeClientDetail`,
        });
      } else {
        return dispatch({
          type: `${NAMESPACE}/openClientDetail`,
          payload: {
            expendedClient: id,
          },
        });
      }
    },
    [expand]
  );
};
