import lodash from 'lodash';
import { getCaseDetail } from '@/services/claimAssessmentControllerService';

export default function* getCaseDetails({ payload }: any, { call, put }: any) {
  const response = yield call(getCaseDetail, payload);
  if (
    response.success &&
    response.resultData &&
    !lodash.isEmpty(response.resultData?.businessData)
  ) {
    // 保存理赔数据
    yield put({
      type: 'BusinessDataSave',
      payload: { businessData: response.resultData?.businessData || {} },
    });
  }
  return response;
}
