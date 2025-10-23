import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

export default () => {
  const dispatch = useDispatch();
  return useCallback(async (policyNo) => {
    await dispatch({
      type: `${NAMESPACE}/loadProductCodeConfig`,
      payload: {
        policyNo,
      },
    });
  }, []);
};
