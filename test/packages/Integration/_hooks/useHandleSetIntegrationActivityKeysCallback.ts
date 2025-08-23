import { useDispatch } from 'dva';
import { useCallback } from 'react';

export default () => {
  const dispatch = useDispatch();
  return useCallback((keys: string[]) => {
    dispatch({
      type: 'integration/saveIntegrationActivityKeys',
      payload: {
        integrationActivityKeys: keys,
      },
    });
  }, []);
};
