import { getAgentFromAS } from '@/services/owbNbProposalAgentControllerService';
import lodash from 'lodash';

export default function* getAgentList({ payload }: any, { call, put }: any) {
  const { agentType, agentNo, id, businessNo, caseNo, taskId } = lodash.pick(payload, [
    'agentType',
    'agentNo',
    'id',
    'businessNo',
    'caseNo',
    'taskId',
  ]);
  const result = yield call(
    getAgentFromAS,
    {
      agentType,
      agentNo,
      applicationNo: businessNo,
    },
    {
      headers: {
        caseNo,
        businessNo,
        taskId,
      },
    }
  );

  if (result.success && result.resultData) {
    const uwProposalAgent = lodash.get(result, 'resultData.uwProposalAgent');
    const changedFields = lodash.pick(uwProposalAgent, [
      'agencyCode',
      'agencyName',
      'agentEmail',
      'agentGivenName',
      'agentPhone',
      'laBranchCode',
      'agentChannelCode',
      'servicingBranch',
      'bankNo',
      'servicingBranchEmail',
      'agentAddressDetail',
      'agentGroup',
    ]);

    yield put({
      type: 'saveUWProposalAgent',
      payload: {
        uwProposalAgent,
      },
    });
    yield put({
      type: 'setDistributionchannelSection',
      payload: {
        changedFields,
        id,
      },
    });
  }
  if (!result.success && payload?.agentNo) {
    yield put({
      type: 'cleanAgentList',
    });
    yield put({
      type: 'saveUWProposalAgent',
      paylad: {
        uwProposalAgent: null,
      },
    });
  }
}
