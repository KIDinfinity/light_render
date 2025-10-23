import { useCallback } from 'react';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useDispatch } from 'dva';

export default () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/addMibInformation`,
    });
  }, []);
};
