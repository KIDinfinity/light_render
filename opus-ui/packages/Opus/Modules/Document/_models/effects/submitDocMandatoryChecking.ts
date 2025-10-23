import lodash from 'lodash';
import { submitDocMandatoryChecking } from '@/services/docMandatoryCheckingWaiveControllerService';

export default function* ({ payload }: any, { put, call }: any) {
  const response = yield call(submitDocMandatoryChecking, payload);
  const { success } = lodash.pick(response, ['success']);
  if (success) {
    yield put({
      type: 'saveDocMandatoryChecking',
      payload: {
        checked: true,
        reason: payload.reason,
      },
    });
  }
}
