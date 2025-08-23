import { useEffect } from 'react';
import { useDispatch } from 'dva';

export default ({ processInstanceId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (processInstanceId) {
      dispatch({
        type: 'workspaceCases/infoData',
        payload: {
          processInstanceId,
        },
      });
    }
  }, [dispatch, processInstanceId]);
};
