import lodash from 'lodash';
import { getPlanExtraPremiumLoadingRulesListByRegionCode } from '@/services/owbNbCfgControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const regionCode = lodash.get(payload, 'regionCode');
  const response = yield call(getPlanExtraPremiumLoadingRulesListByRegionCode, { regionCode });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    yield put({
      type: 'setPlanExtraPremiumLoadingRulesListConfigs',
      payload: {
        planExtraPremiumLoadingRulesConfigs: resultData,
      },
    });
  }
}
