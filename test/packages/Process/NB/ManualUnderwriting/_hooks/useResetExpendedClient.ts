import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch({
        type: `${NAMESPACE}/resetExpendedClient`,
      });
    }
  }, []);
};
