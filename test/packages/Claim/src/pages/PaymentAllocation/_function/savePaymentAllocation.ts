import { createNormalizeData } from '@/utils/claimUtils';

const savePaymentAllocation = (draftState: any, claimData: any, wholeEntities: any) => {
  const draft = draftState;

  const result = createNormalizeData(claimData, wholeEntities);
  const { claimEntities, claimProcessData } = result;

  const { payeeListMap, policyBenefitListMap, beneficiaryListMap } = claimEntities;
  const { payeeList, policyBenefitList, c360BeneficiaryInfo, callV2 } = claimProcessData;

  draft.claimEntities.payeeListMap = payeeListMap;
  draft.claimEntities.policyBenefitListMap = policyBenefitListMap;
  draft.claimEntities.beneficiaryListMap = beneficiaryListMap;
  draft.claimProcessData.payeeList = payeeList;
  draft.claimProcessData.policyBenefitList = policyBenefitList;
  draft.claimProcessData.c360BeneficiaryInfo = c360BeneficiaryInfo;
  draft.claimProcessData.callV2 = callV2;

  return draft;
};

export default savePaymentAllocation;
