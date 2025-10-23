import { useCallback } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { transfer } from '@/services/owbNbPremiumEnquiryControllerService';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import bpm from 'bpm/pages/OWBEntrance';

interface Iprops {
  setLoading: any;
}
export default ({ setLoading }): Iprops => {
  const dispatch = useDispatch();
  return useCallback(() => {
    (async () => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      setLoading(true);
      const response = await transfer(dataForSubmit);
      setLoading(false);
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
