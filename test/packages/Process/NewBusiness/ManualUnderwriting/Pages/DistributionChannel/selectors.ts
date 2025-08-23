import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import AgentType from 'process/NewBusiness/Enum/AgentType';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
interface IDistributionChannel {
  bankStaffList: any[];
  campaignList: any[];
  bankChannelList: any[];
  branchCodeList: any[];
  agentChannelCode: null | string;
  distributionChannelList: Record<string, any>;
}

const DistributionChannelModalDataPath = `${NAMESPACE}.modalData.distributionChannel`;
const originAgentListPath = `${NAMESPACE}.processData.agentList`;
export const distributionChannelDataSelector = (state: any) =>
  lodash.get(state, DistributionChannelModalDataPath) as IDistributionChannel;
const originAgentListSelector = (state: any) => lodash.get(state, originAgentListPath) as any[];

// Case Context Selector
export const taskIdentifierSelector = (state: any) => {
  const task = state?.processTask?.getTask;
  return {
    businessNo: task?.businessNo,
    caseNo: task?.caseNo,
    taskId: task?.taskId,
  };
};

// Dicts selectors
export const campaignDictsSelector = (state: any) => {
  const campaignList = distributionChannelDataSelector(state)?.campaignList;
  return lodash.map(campaignList, (item: any) => {
    const { dictCode, campaignCode, campaignName } = item;
    return {
      ...item,
      dictCode: dictCode || campaignCode,
      dictName: campaignName,
    };
  });
};
export const finalBankChannelDictsSelector = (state: any) => {
  const bankChannelList = distributionChannelDataSelector(state)?.bankChannelList;
  return lodash
    .map(bankChannelList, (item: any) => {
      const dictName = lodash.get(item, 'bankName');
      const dictCode = lodash.get(item, 'bankCode');
      return {
        dictName,
        dictCode,
      };
    })
    .filter((item: any) => !lodash.isEmpty(item.dictName));
};
export const createBankStaffNoDictsSelector = (id: string) => (state: any) => {
  const { bankStaffList, distributionChannelList } = distributionChannelDataSelector(state);
  const { agentNo } = distributionChannelList?.[id];
  const bankStaff = bankStaffList[agentNo];
  const dicts = bankStaff?.bankList?.map((item: any) => {
    return {
      dictCode: item.bankStaffNo,
      dictName: item.bankStaffNo + '-' + item.bankStaffRefName,
    };
  });
  return dicts;
};

// modalData

export const distributionChannelListSelector = (state: any) => {
  const obj = distributionChannelDataSelector(state)?.distributionChannelList;
  if (!!obj) {
    return Object.values(obj);
  }
  return [];
};
export const agentChannelByIdSelector = (id: string) => (state: any) => {
  return distributionChannelDataSelector(state)?.distributionChannelList?.[id];
};
export const defaultServicingBranchByIdSelector = (id: string) => (state: any) => {
  const { bankList, bankStaffNo } = distributionChannelDataSelector(
    state
  )?.distributionChannelList?.[id];

  if (!bankList || !Array.isArray(bankList)) return null;
  return (
    bankList.find((item) => item.bankStaffNo === formUtils.queryValue(bankStaffNo))
      ?.servicingBranch || null
  );
};
export const commissionSplitPercentListSelector = (state: any) => {
  const distributionChannelList = distributionChannelDataSelector(state)?.distributionChannelList;
  return lodash
    .chain(distributionChannelList)
    .map((item) => ({
      id: item.id,
      commissionSplitPercent: item.commissionSplitPercent,
    }))
    .value();
};
// confirmData
export const confirmDistributionChannelListSelector = (state: any) => {
  const obj = distributionChannelDataSelector(state)?.distributionChannelList;
  const originAgentList = originAgentListSelector(state);
  const otherAgents = originAgentList.filter(
    (item) => item.agentType !== AgentType.Primary && item.agentType !== AgentType.Commission
  );
  return {
    agentList: [...Object.values(obj)?.filter((item: any) => !item?.isLast), ...otherAgents],
  };
};
