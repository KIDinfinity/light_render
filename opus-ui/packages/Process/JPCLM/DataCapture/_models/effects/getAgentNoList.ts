import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formUtils } from 'basic/components/Form';
import claimPolicyAgentInformationControllerService from '@/services/claimPolicyAgentInformationControllerService';

export default function* getAgentNoList({ payload }: any, { call, put, select }: any) {
  const { agentNoList, policyAgent } = yield select((state: any) => ({
    agentNoList: state.JPCLMOfDataCapture.agentNoList,
    policyAgent: state.JPCLMOfDataCapture.claimProcessData.policyAgent,
  }));
  const requestParam = objectToFormData(payload);

  const response = yield call(
    claimPolicyAgentInformationControllerService.getAgentNo,
    requestParam
  );
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    const curAgentNumber = formUtils.queryValue(policyAgent?.agentNumber);
    resultData.push(curAgentNumber);
    const concatAgentNoList = lodash.chain(resultData).concat(agentNoList).compact().uniq().value();
    yield put({
      type: 'savePartyListInfo',
      payload: {
        agentNoList: concatAgentNoList,
      },
    });
  }
  return response;
}
