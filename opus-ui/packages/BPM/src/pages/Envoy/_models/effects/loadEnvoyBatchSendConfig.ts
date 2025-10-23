import lodash from 'lodash';
import { listEnvoyBatchSendConfig } from '@/services/envoyReasonConfigControllerService';

export default function* loadEnvoyBatchSendConfig({ signal }: any, { put, call, select }: any) {
  const caseCategory = yield select((state: any) => state.envoyController.caseCategory);
  if (caseCategory) {
    const response = yield call(
      listEnvoyBatchSendConfig,
      {
        caseCategory,
      },
      { signal }
    );
    const { success, resultData = [] } = lodash.pick(response, ['resultData', 'success']);
    if (success) {
      yield put({
        type: 'saveEnvoyBatchSendConfig',
        payload: {
          envoyBatchSendConfigs: resultData,
        },
      });
    }
  }
}
