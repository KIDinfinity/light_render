import { serialize as objectToFormData } from 'object-to-formdata';
import { listPolicyIdsByInsuredId } from '@/services/claimInsuredPolicyControllerService';

export default function* queryListPolicy({ payload }: any, { call, put }: any) {
  const requestParam = objectToFormData(payload);
  const response = yield call(listPolicyIdsByInsuredId, requestParam);
  if (response && response.success && response.resultData) {
    const listPolicy = response.resultData;
    yield put({
      type: 'saveListPolicy',
      payload: listPolicy,
    });
  }
  return response;
}
