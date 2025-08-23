import { produce } from 'immer';

const addMainBenefitItem = (state: any, action: any) => {
  const { treatmentId, addMainBenefitItem } = action.payload;
  const nextState = produce(state, (draftState) => {
    if (!draftState.claimEntities.treatmentListMap[treatmentId].mainBenefitList) {
      draftState.claimEntities.treatmentListMap[treatmentId].mainBenefitList = [];
    }
    draftState.claimEntities.treatmentListMap[treatmentId].mainBenefitList = [
      ...draftState.claimEntities.treatmentListMap[treatmentId].mainBenefitList,
      addMainBenefitItem.id,
    ];
    draftState.claimEntities.mainBenefitListMap[addMainBenefitItem.id] = addMainBenefitItem;
  });

  return { ...nextState };
};

export default addMainBenefitItem;
