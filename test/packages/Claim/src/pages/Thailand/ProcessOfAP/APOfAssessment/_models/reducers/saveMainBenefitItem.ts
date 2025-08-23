import { produce } from 'immer';

const saveMainBenefitItem = (state: any, action: any) => {
  const { mainBenefitId, changedFields } = action.payload;
  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.mainBenefitListMap[mainBenefitId] = {
      ...state.claimEntities.mainBenefitListMap[mainBenefitId],
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveMainBenefitItem;
