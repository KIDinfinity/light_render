import { produce }  from 'immer';
import lodash from 'lodash';

const accidentBenefitPayableItemDelete = (state: any, action: any) => {
  const { treatmentPayableId, id } = action.payload;
  const newAccidentBenefitPayableList = lodash.filter(
    lodash.get(
      state,
      `claimEntities.treatmentPayableListMap.${treatmentPayableId}.accidentBenefitPayableList`
    ),
    (item) => item !== id
  );

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.treatmentPayableListMap[
      treatmentPayableId
    ].accidentBenefitPayableList = newAccidentBenefitPayableList;
    delete draftState.claimEntities.accidentBenefitPayableListMap[id];
  });

  return { ...nextState };
};

export default accidentBenefitPayableItemDelete;
