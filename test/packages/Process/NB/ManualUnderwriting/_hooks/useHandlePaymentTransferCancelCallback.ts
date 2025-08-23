import { useCallback } from 'react';
import lodash from 'lodash';
import { cancel } from '@/services/owbNbPremiumEnquiryControllerService';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleCloseTransferPaymentModal from 'process/NB/ManualUnderwriting/_hooks/useHandleCloseTransferPaymentModal';
import bpm from 'bpm/pages/OWBEntrance';

interface IProps {
  setLoading: any;
}
export default ({ setLoading }: IProps) => {
  const dispatch = useDispatch();
  const handleClose = useHandleCloseTransferPaymentModal();
  return useCallback(() => {
    (async () => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      setLoading(true);
      const response = await cancel(dataForSubmit);
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
        handleClose();
      }
    })();
  }, []);
};
