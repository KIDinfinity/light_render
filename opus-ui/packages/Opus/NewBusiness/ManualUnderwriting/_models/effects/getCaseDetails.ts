import { getCaseDetail } from '@/services/claimAssessmentControllerService';

export default function* getCaseDetails({ payload }: any, { call, put }: any) {
  const response = yield call(getCaseDetail, payload);

  if (response.success && response.resultData) {
    const resultData = response.resultData;
    const companyCode = resultData?.businessData?.laCompanyCode;
    const currentHistoryState = window.history.state;
    const { taskDetail = {} } = window as any;
    (window as any).taskDetail = {
      ...taskDetail,
      companyCode: companyCode ?? '2',
    };
    if (companyCode) {
      window.history.replaceState({ ...currentHistoryState, companyCode }, '');
    }
    yield put({
      type: 'getBEToFE',
      payload: {
        businessData: resultData?.businessData,
      },
    });
  }

  return response;
}
