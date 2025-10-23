import { useEffect } from 'react';
import { useDispatch } from 'dva';
import useJudgeAgencyAndEntityPO from 'process/NB/ManualUnderwriting/_hooks/useJudgeAgencyAndEntityPO';
import { NAMESPACE } from '../activity.config';

export default () => {
  const dispatch = useDispatch();
  const isAgencyAndEntityPO = useJudgeAgencyAndEntityPO();
  return useEffect(() => {
    if (isAgencyAndEntityPO) {
      dispatch({
        type: `${NAMESPACE}/setPlanFieldData`,
        payload: {
          changedFields: {
            sourceOfPremium: null,
          },
        },
      });
    }
  }, [isAgencyAndEntityPO, dispatch]);
};
