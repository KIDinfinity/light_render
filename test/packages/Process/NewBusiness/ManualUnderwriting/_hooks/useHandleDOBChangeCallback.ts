import { useCallback } from 'react';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { useDispatch } from 'dva';

export default ({ currentClientId }: any) => {
  const dispatch = useDispatch();

  return useCallback(
    (value) => {
      dispatch({
        type: `${NAMESPACE}/reCalcClientAgeFromBE`,
        payload: {
          currentClientId,
          dateOfBirth: value,
        },
      });
    },
    [dispatch, currentClientId]
  );
};
