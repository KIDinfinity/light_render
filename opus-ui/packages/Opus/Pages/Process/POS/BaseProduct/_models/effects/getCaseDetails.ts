import lodash from 'lodash';
import { getCaseDetail } from '@/services/claimAssessmentControllerService';

export default function* getCaseDetails({ payload }: any, { call, put }: any) {
  const response = yield call(getCaseDetail, payload);
  if (response.success && response.resultData) {
    const claimProcessData = response.resultData?.businessData;
    // 保存理赔数据
    yield put({
      type: 'saveProcessData',
      payload: claimProcessData,
    });

    yield put({
      type: 'saveCaseDetail',
      payload: {
        caseDetail: lodash.omit(response.resultData, 'businessData'),
      },
    });
  }
  return response;
}
