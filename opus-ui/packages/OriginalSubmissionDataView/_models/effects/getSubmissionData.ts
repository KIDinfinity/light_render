import { getCaseRelevantSubmissionBatchInfo } from '@/services/owbRegistrationSubmissionControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { caseNo } = payload;
  const response = yield call(getCaseRelevantSubmissionBatchInfo, objectToFormData({ caseNo }));
  if (response.success && response.resultData) {
    yield put({
      type: 'saveSubmissionData',
      payload: {
        submissionData: response.resultData,
      },
    });
  }
}
