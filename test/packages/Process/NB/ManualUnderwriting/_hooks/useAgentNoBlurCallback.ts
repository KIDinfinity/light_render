import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ agentType, id, form }: any) => {
  const dispatch = useDispatch();
  const taskDetail = useSelector(
    (state: any) => state?.manualUnderwriting?.taskDetail,
    shallowEqual
  );
  const { businessNo, taskId, caseNo } = lodash.pick(taskDetail, [
    'businessNo',
    'taskId',
    'caseNo',
  ]);
  return useCallback(
    async (agentNo) => {
      await dispatch({
        type: `${NAMESPACE}/getAgentList`,
        payload: {
          id,
          agentType,
          agentNo,
          businessNo,
          taskId,
          caseNo,
        },
      });
      await dispatch({
        type: `${NAMESPACE}/getAgentBankList`,
        payload: {
          requestData: [
            {
              agentType,
              agentNo,
              applicationNo: businessNo,
            },
          ],
        },
      });
      form.validateFields(['agentNo'], {
        force: true,
      });
    },
    [form]
  );
};
