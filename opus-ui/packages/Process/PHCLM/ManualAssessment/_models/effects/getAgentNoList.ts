import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import claimPolicyAgentInformationControllerService from '@/services/claimPolicyAgentInformationControllerService';

export default function* getAgentNoList({ payload }: any, { call, put }: any) {
  const requestParam = objectToFormData(payload);

  const response = yield call(
    claimPolicyAgentInformationControllerService.getAgentNo,
    requestParam
  );
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    yield put({
      type: 'savePartyListInfo',
      payload: { agentNoList: lodash.compact(resultData) },
    });
  }
  return response;
}
