import { useCallback } from 'react';
import { useDispatch } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';
import { tarckInquiryPoint, eEventName } from '@/components/TarckPoint';
import usePublishEnvoyChange from '@mc/hooks/usePublishEnvoyChange';
import withTimeout from '@/utils/withTimeout';
import useFindSuccessTemplateByGroupIdCallback from 'bpm/pages/Envoy/hooks/useFindSuccessTemplateByGroupIdCallback';
import lodash from 'lodash';
import { getDeleteEnvoy, getUnrelevantEnvoy, getMergedEnvoy } from '../_utils/mergeEnvoyUtils';
import useHandleSaveAllEnvoyCallback from 'bpm/pages/Envoy/hooks/useHandleSaveAllEnvoyCallback';

export default () => {
  const dispatch = useDispatch();
  const handlerEnvoySended = usePublishEnvoyChange();
  const findSuccessTemplateByGroupId = useFindSuccessTemplateByGroupIdCallback();

  const handleSaveAllEnvoy = useHandleSaveAllEnvoyCallback();
  return useCallback(async () => {
    const hasError = await dispatch({
      type: 'envoyController/validateFields',
      payload: {
        allGroups: true,
      },
    });

    const otherError = await dispatch({
      type: 'envoyController/validateExtraFields',
    });

    if (!hasError && !otherError) {
      bpm.buttonAction('save');
      let reasonDetailsList: any = [];
      await handleSaveAllEnvoy();
      const finishSendEnvoyCodeSet = new Set();
      const resolveData = { result: true, data: {} };
      const state = await dispatch({ type: 'global/accessStore' });
      const envoyNeedMerge = getMergedEnvoy(state);
      const envoyNoNeedMerge = getUnrelevantEnvoy(state);
      const envoyNeedDelete = getDeleteEnvoy(state);
      for (const toDeleteGroup of envoyNeedDelete) {
        await dispatch({
          type: 'envoyController/delEnvoy',
          payload: {
            id: toDeleteGroup.id,
          },
        });
      }
      for (const currentReasonNeedMerge of envoyNeedMerge) {
        dispatch({
          type: 'envoyController/saveReasonGroupWithoutEffects',
          payload: {
            groupDetail: currentReasonNeedMerge,
            id: currentReasonNeedMerge?.id,
          },
        });
      }
      for (const reasonGroup of [...envoyNeedMerge, ...envoyNoNeedMerge]) {
        try {
          const response: any = await withTimeout(
            dispatch({
              type: 'envoyController/sendEnvoy',
              payload: {
                reasonGroup,
                otherData: resolveData?.data,
              },
            })
          );

          if (!response?.res?.success) {
            break;
          } else {
            handlerEnvoySended(response?.res?.resultData);
            reasonDetailsList = lodash.concat(
              reasonDetailsList,
              response?.res?.resultData?.reasonDetails || []
            );
            const sendedGroupCode = lodash.get(response, 'res.resultData.groupCode');

            finishSendEnvoyCodeSet.add(sendedGroupCode);
            if (response?.res?.resultData?.externalUrl) {
              tarckInquiryPoint(dispatch, {
                eventName: eEventName.correspondence,
                eventOperation: response?.params?.name,
                processInstanceId: response?.params?.caseNo,
                inquiryBusinessNo: response?.params?.inquiryBusinessNo,
                caseCategory: response?.params?.caseCategory,
                activityKey: response?.params?.activityKey,
              });
            }
          }
        } catch (error) {
          console.error('Failed to send envoy:', error);
          break; // 如果超时或发生错误，停止循环
        }
      }

      await findSuccessTemplateByGroupId(reasonDetailsList);
    }
  }, [handleSaveAllEnvoy]);
};
