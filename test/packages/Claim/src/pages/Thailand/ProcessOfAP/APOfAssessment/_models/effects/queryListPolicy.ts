import { serialize as objectToFormData } from 'object-to-formdata';
import claimInsuredPolicyControllerService from '@/services/claimInsuredPolicyControllerService';

export default function* queryListPolicy({ payload }: any, { call, put }: any) {
  const response = yield call(
    claimInsuredPolicyControllerService.listPolicies,
    objectToFormData(payload)
  );

  if (response && response.success) {
    yield put({
      type: 'saveListPolicy',
      payload: response.resultData,
    });
  }
  return response;
}
