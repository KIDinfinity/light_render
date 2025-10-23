import { getCaseDetail } from '@/services/claimAssessmentControllerService';

export default function* getCaseDetails({ payload }: any, { call, put }: any) {
  const response = yield call(getCaseDetail, payload);

  if (response.success && response.resultData) {
    const resultData = response.resultData;

    yield put({
      type: 'saveClaimProcessData',
      payload: resultData?.businessData,
    });
  }

  return response;
}
