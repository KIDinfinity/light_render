import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ applicationNo, operationType }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function a() {
      await dispatch({
        type: `${NAMESPACE}/getNewestEwsByOperationType`,
        payload: {
          applicationNo,
          operationType,
        },
      });
    }
    a();
  }, [applicationNo]);
};
