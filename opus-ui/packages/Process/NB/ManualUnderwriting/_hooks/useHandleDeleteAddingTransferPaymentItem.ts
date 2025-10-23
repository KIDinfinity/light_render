import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

export default () => {
  const dispatch = useDispatch();

  return useCallback(
    ({ id }) => {
      dispatch({
        type: `${NAMESPACE}/deleteTransferPaymentItem`,
        payload: {
          id,
        },
      });
    },
    [dispatch]
  );
};
