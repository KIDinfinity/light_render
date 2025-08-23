import lodash from 'lodash';
import { getPolicyLoanHistorys } from '@/services/owbNbNbInquiryControllerService';

export default function* ({ payload }: any, { call, put, select }: any) {
  const getTask = yield select(({ processTask }: any) => processTask?.getTask);
  const { activityKey, businessNo, caseCategory, caseNo, taskId } = getTask
  const loanDetailId = payload.loanDetailId
  const response = yield call(getPolicyLoanHistorys, {
    activityKey, businessNo, caseCategory, caseNo, taskId, loanDetailId
  });

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    yield put({
      type: 'changeLoanDetailList',
      payload: {
        id: loanDetailId,
        changedFields: { loanHistoryList: resultData }
      },
    });
  }


  return success ? resultData : [];

}
