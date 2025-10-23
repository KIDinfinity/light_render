import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ optionName }: any) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/changeSustainabilityCheckingSelected`,
      payload: {
        sustainabilityCheckingSelected: optionName,
      },
    });
    dispatch({
      type: `${NAMESPACE}/saveSustainabilityAuditLog`,
      payload: {
        optionName
      }
    })

  }, [optionName]);
};
