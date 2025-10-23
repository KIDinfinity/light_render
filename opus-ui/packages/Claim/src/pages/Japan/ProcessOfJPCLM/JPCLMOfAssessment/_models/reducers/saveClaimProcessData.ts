import { compact, sortBy, set, get } from 'lodash';
import { createNormalizeData } from '@/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';

const saveClaimProcessData = (state: any, action: any) => {
  const claimData = { ...action.payload };

  const { preApprovalValue } = state;
  if (!claimData.incidentList) {
    claimData.incidentList = [];
  }
  if (!claimData.claimPayableList) {
    claimData.claimPayableList = [];
  }
  if (!claimData.payeeList) {
    claimData.payeeList = [];
  }
  claimData.claimPayableList = sortBy(claimData.claimPayableList, (item) => item.policyNo);
  claimData.policyBenefitList = compact(claimData.policyBenefitList);
  // 这个值比较特殊，没有completed就每次都call接口，获取新的值。。
  if (preApprovalValue !== '') {
    set(claimData, 'claimDecision.preApprovalValue', preApprovalValue);
  }
  // 如果数据中没有这个值，默认为N（兼容旧数据）
  if (!get(claimData, 'claimDecision.preApprovalValue')) {
    set(claimData, 'claimDecision.preApprovalValue', 'N');
  }

  const result = createNormalizeData(claimData, wholeEntities);

  return {
    ...state,
    ...result,
  };
};

export default saveClaimProcessData;
