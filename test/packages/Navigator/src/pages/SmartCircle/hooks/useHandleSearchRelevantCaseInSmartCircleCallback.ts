import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { tarckInquiryPoint, eEventName, eEventOperation } from '@/components/TarckPoint';
import { SmartCircleKey } from 'navigator/enum/MachineKey';

export default ({ value }: any) => {
  const dispatch = useDispatch();
  return useCallback(() => {
    (async () => {
      if (value) {
        dispatch({
          type: 'workspaceSwitchOn/changeSwitch',
          payload: {
            name: 'ai',
          },
        });
        const searchValue = `Relevant case of ${value}`;
        await dispatch({
          type: 'workspaceAI/saveMachineKey',
          payload: { machineKey: SmartCircleKey.ListSearch },
        });
        await dispatch({
          type: 'workspaceAI/saveSearchValue',
          payload: {
            searchValue,
          },
        });
        const res: any = await dispatch({
          type: 'workspaceAI/queryListOfSmartCircle',
        });
        const { caseCaseNoResult, caseBusinessResult, taskCaseNoResult, taskBusinessResult } = res;
        if (
          (caseCaseNoResult?.success && caseCaseNoResult?.resultData?.total > 0) ||
          (taskCaseNoResult?.success && taskCaseNoResult?.resultData?.total > 0)
        ) {
          tarckInquiryPoint(dispatch, {
            processInstanceId: searchValue,
            eventName: eEventName.smartCircle,
            eventOperation: eEventOperation.search,
          });
        }
        if (
          (caseBusinessResult?.success && caseBusinessResult?.resultData?.total > 0) ||
          (taskBusinessResult?.success && taskBusinessResult?.resultData?.total > 0)
        ) {
          tarckInquiryPoint(dispatch, {
            inquiryBusinessNo: searchValue,
            eventName: eEventName.smartCircle,
            eventOperation: eEventOperation.search,
          });
        }
      }
    })();
  }, [value]);
};
