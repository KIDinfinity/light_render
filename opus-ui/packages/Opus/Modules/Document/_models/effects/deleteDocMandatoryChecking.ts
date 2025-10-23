import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { deleteByCaseNo } from '@/services/docMandatoryCheckingWaiveControllerService';

export default function* ({ payload }: any, { put, call }: any) {
  const { caseNo } = payload;
  const response = yield call(deleteByCaseNo, objectToFormData({ caseNo }));
  const { success } = lodash.pick(response, ['success']);
  if (success) {
    yield put({
      type: 'saveDocMandatoryChecking',
      payload: {
        checked: false,
        reason: '',
      },
    });
  }
}
