import { produce } from 'immer';

const addBeneficiaryItem = (state: any, action: any) => {
  const { policyBenefitId, addBeneficiaryItem: addBeneficiary } = action.payload;

  const nextState = produce(state, (draft) => {
    const draftState = draft;
    if (!draftState.claimEntities.policyBenefitListMap[policyBenefitId].beneficiaryList) {
      draftState.claimEntities.policyBenefitListMap[policyBenefitId].beneficiaryList = [];
    }
    draftState.claimEntities.policyBenefitListMap[policyBenefitId].beneficiaryList = [
      ...draftState.claimEntities.policyBenefitListMap[policyBenefitId].beneficiaryList,
      addBeneficiary.id,
    ];

    draftState.claimEntities.beneficiaryListMap[addBeneficiary.id] = addBeneficiary;
  });

  return { ...nextState };
};

export default addBeneficiaryItem;
