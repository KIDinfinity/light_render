import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();
  return useCallback(
    ({ addressItemId }: any) => {
      dispatch({
        type: `${NAMESPACE}/deleteCurrentAddress`,
        payload: {
          id: clientId,
          addressItemId,
        },
      });
    },
    [clientId]
  );
};
