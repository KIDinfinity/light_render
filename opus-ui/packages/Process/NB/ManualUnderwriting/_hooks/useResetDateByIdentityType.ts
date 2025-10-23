import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ id }: any) => {
  const dispatch = useDispatch();

  return useCallback(
    (identityType: any) => {
      if (identityType === 'NI') {
        dispatch({
          type: `${NAMESPACE}/handleChangePersaonalFields`,
          payload: {
            changedFields: {
              expiryDate: '',
            },
            id,
          },
        });
      }
    },
    [dispatch, id]
  );
};
