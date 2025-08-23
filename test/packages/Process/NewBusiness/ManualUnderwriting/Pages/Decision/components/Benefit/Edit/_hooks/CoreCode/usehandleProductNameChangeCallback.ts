import { useCallback } from 'react';
import { useDispatch } from 'dva';
import useHandleSetPlanTypeByProductCode from './useHandleSetPlanTypeByProductCode';
import useHandleSetPlanOptionByProductCode from './useHandleSetPlanOptionByProductCode';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const handleSetPlanType = useHandleSetPlanTypeByProductCode({
    id,
  });
  const handleSetNumberOfUnits = useHandleSetPlanOptionByProductCode({ id });

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
      handleSetNumberOfUnits(coreCode);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleSetNumberOfUnits, handleSetPlanType]
  );
};
