import lodash from 'lodash';
import { reIndexDoc } from '@/services/docViewControllerService';

/**
 * 从task detail中获取case information
 */
export default function* reIndexDocument({ payload }: any, { call, put }: any) {
  const response = yield call(reIndexDoc, payload);

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    yield put({
      type: 'getDocuments',
      payload: {}
    });
    return true
  }
}
