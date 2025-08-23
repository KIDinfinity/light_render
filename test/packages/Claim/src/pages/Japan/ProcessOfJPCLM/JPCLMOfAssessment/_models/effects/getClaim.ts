import claimJpclmClaimControllerService from '@/services/claimJpclmClaimControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* getClaim({ payload }: any, { call, put }: any) {
  const requestParam = objectToFormData(payload);
  const response = yield call(claimJpclmClaimControllerService.getClaimAssessment, requestParam);
  if (response.success && response.resultData) {
    const claimProcessData = response.resultData;
    // 保存理赔数据
    yield put({
      type: 'judgmentOfCauseOfIncidentChain',
      payload: claimProcessData,
    });
    yield put({
      type: 'saveClaimProcessData',
      payload: claimProcessData,
    });
  }

  return response;
}
