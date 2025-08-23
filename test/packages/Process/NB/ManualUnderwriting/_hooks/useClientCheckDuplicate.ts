import lodash from 'lodash';
import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { clientCheckDuplicate } from '@/services/owbNbProposalControllerService';
import { NbClientTag } from 'process/NB/CustomerIdentification/Enum';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleSubmitClientChange from 'process/NB/ManualUnderwriting/_hooks/useHandleSubmitClientChange';

export default (id: string) => {
  const dispatch = useDispatch();
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail,
    shallowEqual
  );
  const handleSubmitClientChange = useHandleSubmitClientChange();
  return useCallback(async () => {
    let isBreak = false;
    const dataForSubmit: any = await dispatch({
      type: `${NAMESPACE}/getDataForSubmit`,
    });

    lodash.set(
      dataForSubmit,
      'businessData.policyList[0].clientInfoList',
      lodash.filter(
        dataForSubmit?.businessData?.policyList?.[0]?.clientInfoList,
        (item) => item.id === id
      )
    );
    const data = {
      ...dataForSubmit,
      taskId: taskDetail?.taskId,
      caseCategory: taskDetail?.caseCategory,
      activityKey: taskDetail?.taskDefKey,
      businessNo: taskDetail?.businessNo,
    };
    const dedupCheck = [
      NbClientTag.ProbableMatch,
      NbClientTag.FullyMatch,
      NbClientTag.Mismatch,
      NbClientTag.NotEnoughKeyInfo,
    ];
    const response = await clientCheckDuplicate({
      ...data,
    });
    const { success, resultData } = lodash.pick(response, [
      'success',
      'resultData',
      'promptMessages',
    ]);
    if (success && lodash.isPlainObject(resultData)) {
      await dispatch({
        type: `${NAMESPACE}/saveCustomerIndentificationData`,
        payload: {
          customerIndentificationData: resultData,
        },
      });
      await dispatch({
        type: 'claimEditable/setTaskNotEditable',
        payload: {
          taskNotEditable: false,
        },
      });

      if (
        lodash.includes(
          dedupCheck,
          lodash.get(resultData, 'policyList[0].clientInfoList[0].dedupCheckResult', '')
        )
      ) {
        isBreak = true;
      }

      await dispatch({
        type: `${NAMESPACE}/updateClientsByDedupcheck`,
        payload: {
          customerIndentificationData: resultData,
        },
      });
      if (!isBreak) {
        const updateClientResponse: any = await handleSubmitClientChange();
        return !updateClientResponse?.success;
      }
    }

    if (!success) {
      handleErrorMessageIgnoreXErrorNotice(response);
      return true;
    }
    if (isBreak) {
      await dispatch({
        type: `${NAMESPACE}/setCheckDuplicating`,
        payload: {
          checkDuplicating: id,
        },
      });
      await dispatch({
        type: `${NAMESPACE}/setIndentificationModalVisible`,
        payload: {
          indentificationModalVisible: true,
        },
      });
    }
  }, [taskDetail, dispatch, handleSubmitClientChange]);
};
