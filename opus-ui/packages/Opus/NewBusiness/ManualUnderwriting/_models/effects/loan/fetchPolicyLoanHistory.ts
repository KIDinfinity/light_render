import lodash from 'lodash';
import { getPolicyLoanHistorys } from '@/services/owbNbNbInquiryControllerService';

export default function* (
  {
    payload,
  }: {
    payload: {
      loanDetailId: string;
    };
  },
  { call, put, select }: any
) {
  // @ts-ignore
  const getTask = yield select(({ processTask }: any) => processTask?.getTask);
  const { activityKey, businessNo, caseCategory, caseNo, taskId } = getTask;
  const loanDetailId = payload.loanDetailId;
  // @ts-ignore
  const response = yield call(getPolicyLoanHistorys, {
    activityKey,
    businessNo,
    caseCategory,
    caseNo,
    taskId,
    loanDetailId,
  });

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    yield put({
      type: 'setLoanPolicyHistory',
      payload: {
        id: loanDetailId,
        loanHistoryList: resultData,
      },
    });
  }

  return success ? resultData : [];
}
