import { serialize as objectToFormData } from 'object-to-formdata';
import { byPolicyNo } from '@/services/docViewControllerService';

export default function* ({ payload }: { payload: { policyNo: string } }, { call, put }: any) {
  const response = yield call(byPolicyNo, objectToFormData(payload));
  if (response?.success && response.resultData) {
    yield put({
      type: 'save',
      payload: {
        docConfig: response.resultData,
      },
    });
  }
}
