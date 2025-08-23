import { useCallback } from 'react';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import bpm from 'bpm/pages/OWBEntrance';
import lodash from 'lodash';
import navigatorEnvoyControllerService from '@/services/navigatorEnvoyControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

export default () => {
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask, shallowEqual);
  const dispatch = useDispatch();
  const { caseNo, mainPageCaseNo, mainPageTaskId } = useSelector(({ envoyController }: any) => ({
    ...lodash.pick(envoyController, ['caseNo', 'mainPageCaseNo', 'mainPageTaskId']),
  }));
  return useCallback(async () => {
    if (caseNo === mainPageCaseNo) {
      const response = await navigatorEnvoyControllerService.findReasonInfo(
        objectToFormData({
          caseNo,
          taskId: mainPageTaskId,
        })
      );
      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
      if (success) {
        bpm.reload();
        dispatch({
          type: 'envoyController/saveEnvoyTaskStatus',
          payload: {
            taskStatus: resultData?.taskStatus,
          },
        });
      }
    }
  }, [taskDetail, caseNo, mainPageCaseNo, mainPageTaskId]);
};
