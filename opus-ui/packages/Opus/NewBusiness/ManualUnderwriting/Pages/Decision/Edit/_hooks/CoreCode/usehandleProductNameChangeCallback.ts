import { useCallback } from 'react';
import { useDispatch } from 'dva';
import useHandleSetPlanTypeByProductCode from './useHandleSetPlanTypeByProductCode';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const handleSetPlanType = useHandleSetPlanTypeByProductCode({
    id,
  });

  return useCallback(
    (coreCode) => {
      dispatch({
        type: `${NAMESPACE}/autoAddRider`,
        payload: {
          id,
          coreCode,
        },
      });
      dispatch({
        type: `${NAMESPACE}/autoRemoveRider`,
        payload: {
          id,
          coreCode,
        },
      });
      handleSetPlanType(coreCode);
    },
    [handleSetPlanType]
  );
};
