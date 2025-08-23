import { getCfgOccupationRiskLevel } from '@/services/owbNbCfgControllerService';

export default function* (_: any, { call, put }: any) {
  const response = yield call(getCfgOccupationRiskLevel);
  if (response.success) {
    yield put({ type: 'saveState', payload: { cfgOccupationRiskLevel: response.resultData } });
  }
}
