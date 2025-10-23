import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.requestIdleCallback(() => {
      dispatch({
        type: `${NAMESPACE}/getAllSubAddress`,
      });
    }, []);
  }, []);
};
