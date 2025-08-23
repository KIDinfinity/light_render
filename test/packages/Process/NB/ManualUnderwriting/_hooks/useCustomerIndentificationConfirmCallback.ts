import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { getCustomerIdentification } from '@/services/owbNbNbInquiryControllerService';
import useHandleSubmitClientChange from 'process/NB/ManualUnderwriting/_hooks/useHandleSubmitClientChange';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useClientAsyncSubmit from 'basic/hooks/useClientAsyncSubmit';

export default ({ setLoading }: any) => {
  const dispatch = useDispatch();
  const businessNo = useSelector(
    (state: any) => state.manualUnderwriting?.taskDetail?.businessNo,
    shallowEqual
  );
  const customerIndentificationData = useSelector(
    (state: any) => state.customerIdentification.claimProcessData,
    shallowEqual
  );
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail,
    shallowEqual
  );
  const checkDuplicating = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.checkDuplicating
  );

  const handleSubmit = useClientAsyncSubmit({
    requestInterval: 1000,
    requestTimeLimit: 1000 * 60 * 3,
    taskId: taskDetail?.taskId,
  });
  const handleSubmitClientChange = useHandleSubmitClientChange();
  return useCallback(async () => {
    const errors = await dispatch({
      type: 'customerIdentification/validateFields',
    });
    if (errors?.length > 0) {
      return false;
    }
    setLoading(true);
    await dispatch({
      type: 'manualUnderwriting/updateClientsByDedupcheck',
      payload: {
        customerIndentificationData,
      },
    });
    await dispatch({
      type: `manualUnderwriting/updateEditedInProposalChange`,
    });

    if (checkDuplicating) {
      const confirmData = await dispatch({
        type: 'manualUnderwriting/getConfirmPerposalData',
        payload: {
          checkDuplicating,
        },
      });

      const confirmResponse: any = await handleSubmit({
        params: confirmData,
      });

      if (confirmResponse.success) {
        dispatch({
          type: `${NAMESPACE}/updateCheckduplicateData`,
          payload: {
            businessData: confirmResponse.resultData?.businessData,
          },
        });
        dispatch({
          type: `${NAMESPACE}/setIndentificationModalVisible`,
          payload: {
            indentificationModalVisible: false,
          },
        });
        dispatch({
          type: `${NAMESPACE}/setCheckDuplicating`,
          payload: {
            checkDuplicating: '',
          },
        });
      } else {
        handleErrorMessageIgnoreXErrorNotice(confirmResponse);
        const code = lodash.get(confirmResponse, 'promptMessages[0].code');
        if (['connection.with.ccr.failed.', 'need.update.ccr.client.info'].includes(code)) {
          await dispatch({
            type: `${NAMESPACE}/updateCustomerIndentification`,
            payload: { businessData: confirmResponse.resultData.businessData },
          });
          dispatch({
            type: 'formCommonController/handleUnSubmited',
          });
        }
      }
      setLoading(false);
      return;
    }
    const response = await handleSubmitClientChange();
    const confirmData = await dispatch({
      type: 'manualUnderwriting/getConfirmPerposalData',
    });

    if (response?.success) {
      setLoading(false);
      const confirmResponse: any = await handleSubmit({
        params: confirmData,
      });

      if (confirmResponse.success) {
        dispatch({
          type: 'global/visitTaskDetail',
          payload: {
            taskId: taskDetail?.taskId,
          },
        });
      }
    } else {
      const code = lodash.get(response, 'promptMessages[0].code');
      if (['connection.with.ccr.failed.', 'need.update.ccr.client.info'].includes(code)) {
        await dispatch({
          type: `${NAMESPACE}/updateCustomerIndentification`,
          payload: { businessData: lodash.get(response, 'resultData.businessData') },
        });

        dispatch({
          type: 'formCommonController/handleUnSubmited',
        });
      } else {
        const req = await getCustomerIdentification({
          businessNo,
        });
        if (lodash.isPlainObject(req) && req.success && !lodash.isEmpty(req.resultData)) {
          const updatedData = req.resultData.businessData;
          dispatch({
            type: `${NAMESPACE}/updateCustomerIndentification`,
            payload: {
              claimProcessData: updatedData,
            },
          });
        }
      }

      setLoading(false);
    }
  }, [
    businessNo,
    setLoading,
    customerIndentificationData,
    dispatch,
    handleSubmitClientChange,
    taskDetail?.taskId,
  ]);
};
