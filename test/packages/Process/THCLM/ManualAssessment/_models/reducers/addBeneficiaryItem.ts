import { produce }  from 'immer';

const addBeneficiaryItem = (state: any, action: any) => {
  const { policyBenefitId, addBeneficiaryItem } = action.payload;

  const nextState = produce(state, (draftState) => {
    if (!draftState.claimEntities.policyBenefitListMap[policyBenefitId].beneficiaryList) {
      draftState.claimEntities.policyBenefitListMap[policyBenefitId].beneficiaryList = [];
    }
    draftState.claimEntities.policyBenefitListMap[policyBenefitId].beneficiaryList = [
      ...draftState.claimEntities.policyBenefitListMap[policyBenefitId].beneficiaryList,
      addBeneficiaryItem.id,
    ];

    draftState.claimEntities.beneficiaryListMap[addBeneficiaryItem.id] = addBeneficiaryItem;
  });

  return { ...nextState };
};

export default addBeneficiaryItem;
