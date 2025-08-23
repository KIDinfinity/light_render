import lodash from 'lodash';
import claimPolicyAgentInformationControllerService from '@/services/claimPolicyAgentInformationControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* getPolicyAgentInfo({ payload }: any, { select, call, put }: any) {
  const { agentNumber, businessNo } = payload;

  const params = {
    claimNo: businessNo || '',
    agentNumber,
  };
  const response = yield call(
    claimPolicyAgentInformationControllerService.getPolicyAgent,
    objectToFormData(params)
  );
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && resultData) {
    yield put({
      type: 'savePolicyAgent',
      payload: { policyAgent: resultData },
    });
    yield put({
      type: 'getAgentNoList',
      payload: {
        claimNo: businessNo,
      },
    });
  }
}
