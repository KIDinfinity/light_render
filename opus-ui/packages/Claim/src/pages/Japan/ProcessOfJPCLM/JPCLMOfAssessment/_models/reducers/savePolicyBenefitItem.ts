import { produce } from 'immer';

const savePolicyBenefitItem = (state: any, action: any) => {
  const { changedFields, policyBenefitId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.policyBenefitListMap[policyBenefitId] = {
      ...state.claimEntities.policyBenefitListMap[policyBenefitId],
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default savePolicyBenefitItem;
