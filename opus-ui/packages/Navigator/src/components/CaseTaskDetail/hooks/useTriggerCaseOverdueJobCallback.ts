import { useCallback, useContext } from 'react';
import Context from '../Context';
import moment from 'moment';
import lodash from 'lodash';
import context from 'bpm/pages/OWBEntrance/Context/context';
import { Action } from '@/components/AuditLog/Enum';
import { useDispatch } from 'dva';
import { triggerCaseOverdueJob } from '@/services/owbNbProposalControllerService';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';

export default () => {
  const { taskDetail, overdueTime, setOverdueTime }: any = useContext(Context);
  const dvaDispatch = useDispatch();
  const { dispatch } = useContext(context);
  return useCallback(
    async (currentOverdueTime) => {
      if (!moment(currentOverdueTime).isValid()) {
        return;
      }
      const {
        activityKey,
        businessNo,
        caseCategory,
        processInstanceId: caseNo,
        inquiryBusinessNo,
      } = lodash.pick(taskDetail, [
        'activityKey',
        'businessNo',
        'caseCategory',
        'inquiryBusinessNo',
        'processInstanceId',
      ]);
      const params = {
        activityKey,
        businessNo,
        caseCategory,
        caseNo,
        inquiryBusinessNo,
        manualExtend: true,
        operationType: 'triggerCaseOverdueJob',
        overdueTime: moment(currentOverdueTime).format(),
      };
      const response = await triggerCaseOverdueJob(params);
      if (response?.success && response?.resultData) {
        setOverdueTime(response.resultData);

        // NTU date修改加进audit log
        dvaDispatch({
          type: 'auditLogController/addAuditLog',
          payload: {
            action: Action.UpdateNtuDate,
            content: [
              {
                oldValue: moment(overdueTime).format('YYYY/MM/DD HH:mm'),
                newValue: moment(currentOverdueTime).format('YYYY/MM/DD HH:mm'),
              },
            ],
          },
        });
      }
      if (!response?.success) {
        handleErrorMessageIgnoreXErrorNotice(response);
        setOverdueTime(overdueTime);
        dispatch({
          type: 'setOverdueTime',
          payload: {
            overdueTimeRender: overdueTime,
          },
        });
        return;
      }
    },
    [taskDetail, dispatch, setOverdueTime, overdueTime]
  );
};
