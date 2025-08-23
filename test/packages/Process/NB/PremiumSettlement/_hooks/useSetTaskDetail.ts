import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

export default ({ taskDetail }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/saveTaskDetail`,
      payload: { taskDetail },
    });
    return () => {
      dispatch({ type: `${NAMESPACE}/saveTaskDetail`, payload: { taskDetail: {} } });
    };
  }, [taskDetail]);
};
