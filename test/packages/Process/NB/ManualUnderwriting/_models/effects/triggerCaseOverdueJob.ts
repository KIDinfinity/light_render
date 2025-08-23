import moment from 'moment';
import { triggerCaseOverdueJob } from '@/services/owbNbProposalControllerService';

export default function* ({ payload }: any, { call, put, select }: any) {
  if (!moment(payload).isValid()) {
    return;
  }

  const getTask = yield select(({ processTask }: any) => processTask?.getTask);
  const { activityKey, businessNo, caseCategory, caseNo, inquiryBusinessNo } = getTask;
  const params = {
    activityKey,
    businessNo,
    caseCategory,
    caseNo,
    inquiryBusinessNo,
    manualExtend: true,
    operationType: 'triggerCaseOverdueJob',
    overdueTime: moment(payload).format(),
  };
  const response = yield call(triggerCaseOverdueJob, params);

  if (response?.success && response?.resultData) {
    yield put({ type: 'saveOverdueTime', payload: { overdueTime: response.resultData } });
  }
}
