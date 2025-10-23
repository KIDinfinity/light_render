import { getExpectPolicy } from '@/services/claimQcControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* ({ payload }: any, { call, put }: any) {
  const response = yield call(getExpectPolicy, objectToFormData(payload));
  if (response?.success) {
    yield put({
      type: 'saveExpectPolicy',
      payload: { expectPolicyList: response.resultData || [] },
    });
  }
}
