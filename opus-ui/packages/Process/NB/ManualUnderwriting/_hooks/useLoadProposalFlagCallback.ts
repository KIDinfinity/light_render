import { useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();

  const applicationNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData?.applicationNo,
    shallowEqual
  );
  return useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/loadProposalFlags`,
      payload: {
        applicationNo,
      },
    });
  }, [dispatch, applicationNo]);
};
