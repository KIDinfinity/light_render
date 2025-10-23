import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';

import { claimRegisterSucceeded } from '@/services/claimIntegrationHistoryControllerService';

export default function* checkRegisterMcs({ payload }: any, { call, put }: any) {
  const response = yield call(claimRegisterSucceeded, objectToFormData(payload));
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    yield put({
      type: 'saveRegisterMcs',
      payload: {
        isRegisterMcs: !!resultData,
      },
    });
  }
}
