import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';

import { hasCallRegisterMcs } from '@/services/claimCheckClaimRegisterMcsControllerService';

export default function* checkRegisterMcs({ payload }: any, { call, put }: any) {
  const response = yield call(hasCallRegisterMcs, objectToFormData(payload));
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && resultData) {
    yield put({
      type: 'saveRegisterMcs',
      payload: {
        isRegisterMcs: !!resultData,
      },
    });
  }
}
