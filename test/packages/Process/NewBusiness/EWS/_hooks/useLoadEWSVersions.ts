import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/EWS/activity.config';

export default ({ applicationNo, setLoading }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (applicationNo) {
        setLoading(true);
        await dispatch({
          type: `${NAMESPACE}/getEWSVersions`,
          payload: {
            applicationNo,
          },
        });
        setLoading(false);
      }
    })();
  }, [applicationNo, dispatch, setLoading]);
};
