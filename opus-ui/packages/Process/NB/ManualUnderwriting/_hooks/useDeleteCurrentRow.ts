import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();
  return useCallback(
    ({ contactItemId }: any) => {
      dispatch({
        type: `${NAMESPACE}/deleteContactItem`,
        payload: {
          id: clientId,
          contactItemId,
        },
      });
    },
    [clientId]
  );
};
