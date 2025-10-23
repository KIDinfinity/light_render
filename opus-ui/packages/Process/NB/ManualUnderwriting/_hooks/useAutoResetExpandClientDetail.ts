import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ expendStatus }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (expendStatus === false) {
      dispatch({
        type: `${NAMESPACE}/resetExpendedClient`,
      });
    }
  }, [expendStatus, dispatch]);
};
