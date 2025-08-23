import { useEffect } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ businessData }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const policyId = lodash.get(businessData, 'policyId');
    dispatch({
      type: `${NAMESPACE}/loadPolicyLevelFecRiskMsg`,
      payload: {
        policyId,
      },
    });
  }, [businessData]);
};
