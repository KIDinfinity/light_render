import { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';

export default () => {
  const dispatch = useDispatch();
  const autoRefreshSession = useSelector(({ user }: any) => user.currentUser?.autoRefreshSession);
  useEffect(() => {
    let timer = 0;
    if (autoRefreshSession === 'Y') {
      timer = setInterval(() => {
        dispatch({
          type: 'workspaceUser/refreshSession',
          payload: {},
        });
      }, 10 * 60 * 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [autoRefreshSession]);
};
