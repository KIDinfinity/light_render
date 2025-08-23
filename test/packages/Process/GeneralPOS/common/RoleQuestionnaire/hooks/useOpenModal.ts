import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

export default ({ clientId }) => {
  const dispatch = useDispatch();
  return useCallback(async () => {
    await dispatch({
      type: `${NAMESPACE}/saveSelectClient`,
      payload: { selectClient: clientId },
    });
    await dispatch({
      type: `${NAMESPACE}/saveVisible`,
      payload: { visible: true },
    });
  }, [dispatch, clientId]);
};
