import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/CustomerIdentification/activity.config';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getRoleDicts`,
    });
  }, []);
};
