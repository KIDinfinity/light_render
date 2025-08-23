import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { findByCaseNo } from '@/services/docMandatoryCheckingWaiveControllerService';

export default function* ({ payload }: any, { put, call }: any) {
  const { caseNo } = payload;
  const response = yield call(findByCaseNo, objectToFormData({ caseNo }));
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  let checked = false;
  let reason = '';
  if (success && resultData) {
    checked = true;
    reason = resultData.reason;
  }
  yield put({
    type: 'saveDocMandatoryChecking',
    payload: {
      checked,
      reason,
    },
  });
}
