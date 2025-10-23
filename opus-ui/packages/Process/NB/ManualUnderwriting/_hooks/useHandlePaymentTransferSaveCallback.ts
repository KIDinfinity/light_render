import { useCallback } from 'react';
import lodash from 'lodash';
import { save } from '@/services/owbNbPremiumEnquiryControllerService';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import bpm from 'bpm/pages/OWBEntrance';

export default () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    (async () => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const response = await save(dataForSubmit);
      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

      if (success) {
        dispatch({
          type: `${NAMESPACE}/saveBizData`,
          payload: {
            businessData: resultData?.businessData,
          },
        });
        bpm.buttonAction('save');
      }
    })();
  }, []);
};
