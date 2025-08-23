import { produce } from 'immer';

const paymentUpdateData = (state: any, action: any) => {
  const { claimEntities, claimProcessData } = action?.payload || {};
  const nextState = produce(state, (draftState: any) => {
    const { payeeListMap, policyBenefitListMap, beneficiaryListMap } = claimEntities;
    const { payeeList, policyBenefitList, c360BeneficiaryInfo } = claimProcessData;

    draftState.claimEntities.payeeListMap = payeeListMap;
    draftState.claimEntities.policyBenefitListMap = policyBenefitListMap;
    draftState.claimEntities.beneficiaryListMap = beneficiaryListMap;
    draftState.claimProcessData.payeeList = payeeList;
    draftState.claimProcessData.policyBenefitList = policyBenefitList;
    draftState.claimProcessData.c360BeneficiaryInfo = c360BeneficiaryInfo;
  });

  return { ...nextState };
};

export default paymentUpdateData;
