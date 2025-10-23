import { getAgentFromAS } from '@/services/owbNbProposalAgentControllerService';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import {
  agentChannelByIdSelector,
  taskIdentifierSelector,
} from 'opus/NewBusiness/ManualUnderwriting/Pages/DistributionChannel/selectors';
type TAction = {
  type: 'getAgentInfo';
  payload: {
    id: string;
  };
};
export default function* pullAgentInfoById({ payload }: TAction, { call, put, select }: any) {
  const { id } = lodash.pick(payload, ['id']);
  // @ts-ignore
  const taskIdentifier = yield select(taskIdentifierSelector);

  const agent = yield select(agentChannelByIdSelector(id));
  const agentType = agent.agentType;
  const agentNo = formUtils.queryValue(agent.agentNo);
  const isLast = agent.isLast;
  const params = {
    agentType,
    agentNo,
    applicationNo: taskIdentifier.businessNo,
    agentChannelCode: agent?.agentChannelCode || '',
  };
  // @ts-ignore
  const result = yield call(
    getAgentFromAS,
    { ...formUtils.objectQueryValue(params) },
    {
      headers: taskIdentifier,
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
      'agentSubChannelCode',
    ]);
    // 更新BankStaffList
    const bankList =
      uwProposalAgent.bankList?.map((bank: any) => ({
        bankStaffNo: bank.bankStaffNo,
        bankStaffRefName: bank.bankStaffRefName,
        servicingBranch: bank.servicingBranch,
      })) || [];
    yield put({
      type: `patchBankStaffList`,
      payload: {
        bankStaffList: {
          [agentNo]: {
            agentNo,
            bankList,
          },
        },
      },
    });
    yield put({
      type: 'updateDistributionChannel',
      payload: {
        distributionChannel: {
          ...changedFields,
          id,
          validAgentNo: true,
          isLast: false,
        },
      },
    });
    if (isLast) {
      yield put({
        type: 'addDistributionChannel',
      });
    }
  } else {
    yield put({
      type: 'setDistributionChannel',
      payload: {
        distributionChannel: {
          agentType,
          agentNo,
          id,
          validAgentNo: false,
        },
      },
    });
  }
}
