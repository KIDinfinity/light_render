import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default (submissionChannel: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/searchFactoringHouse`,
      payload: {
        submissionChannel
      },
    });
  }, [submissionChannel]);
};
