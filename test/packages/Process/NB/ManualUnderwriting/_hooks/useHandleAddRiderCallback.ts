import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  const applicationNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData?.applicationNo,
    shallowEqual
  );
  const policyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData?.policyId,
    shallowEqual
  );
  return useCallback(
    (coreCode = '') => {
      dispatch({
        type: `${NAMESPACE}/addRider`,
        payload: {
          applicationNo,
          policyId,
          coreCode,
        },
      });
    },
    [applicationNo, policyId]
  );
};
