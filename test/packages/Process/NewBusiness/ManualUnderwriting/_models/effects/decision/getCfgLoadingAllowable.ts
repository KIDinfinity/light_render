import lodash from 'lodash';
import { getCfgLoadingAllowable } from '@/services/owbNbCfgControllerService';

export default function* (_: any, { call, put }: any) {
  const response = yield call(getCfgLoadingAllowable);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    yield put({
      type: 'setLoadingAllowableConfigs',
      payload: {
        loadingAllowableConfigs: resultData,
      },
    });
  }
}
