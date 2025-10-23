
import claimDecisionMappingControllerService from '@/services/claimDecisionMappingControllerService';

export default function* decisionMapping({ payload }: any, { call, put }: any) {
  const response = yield call(claimDecisionMappingControllerService.decisionMapping);
  if (response.success && response.resultData) {
    const claimProcessData = response.resultData;
    yield put({
      type: 'saveDecisionMapping',
      payload: {claimProcessData},
    });
  }
  return response;
}
