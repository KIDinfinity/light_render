import { produce }  from 'immer';
import lodash from 'lodash';

const removeMainBenefitItem = (state: any, action: any) => {
  const { treatmentId, mainBenefitId } = action.payload;
  const newMainBenefitList = lodash.filter(
    state.claimEntities.treatmentListMap[treatmentId].mainBenefitList,
    (item) => item !== mainBenefitId
  );

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.treatmentListMap[treatmentId].mainBenefitList = newMainBenefitList;
    delete draftState.claimEntities.mainBenefitListMap[mainBenefitId];
  });

  return { ...nextState };
};

export default removeMainBenefitItem;
