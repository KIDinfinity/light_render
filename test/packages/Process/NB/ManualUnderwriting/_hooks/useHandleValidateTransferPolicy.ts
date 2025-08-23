import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { produce }  from 'immer';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { validateTransfer } from '@/services/owbNbPremiumEnquiryControllerService';

export default () => {
  const dispatch = useDispatch();
  return useCallback((e) => {
    (async () => {
      const policyNo = e?.target.value;
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      const requestData = produce(dataForSubmit, (draft: any) => {
        lodash.set(draft, 'businessData.policyList[0]validatingTransferPolicyId', policyNo);
      });

      const response = await validateTransfer(requestData);
      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
      if (success) {
        dispatch({
          type: `${NAMESPACE}/updateTargetApplicationNo`,
          payload: {
            targetApplicationNo: resultData,
            policyNo,
          },
        });
      }
    })();
  }, []);
};
