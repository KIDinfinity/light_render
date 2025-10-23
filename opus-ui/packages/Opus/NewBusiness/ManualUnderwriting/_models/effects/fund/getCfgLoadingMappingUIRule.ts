import lodash from 'lodash';
import { getCfgLoadingMappingUIRule } from '@/services/owbNbCfgControllerService';

export default function* (_: any, { call, put }: any) {
  const response = yield call(getCfgLoadingMappingUIRule);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    yield put({
      type: 'setLoadingMappingRule',
      payload: {
        loadingMappingRule: resultData,
      },
    });
  }
}
