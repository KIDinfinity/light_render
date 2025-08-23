import { produce } from 'immer';
import { filter } from 'lodash';
import { removeTreatmentPayableItemExpectDecision } from '../functions/expectDecisionFunc';
import { deleteErrorMessages } from '../functions';

const deleteTreatmentPayableItem = (state, action) => {
  const { claimPayableItemId, treatmentPayableItemId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const { claimEntities, claimProcessData } = draftState;
    removeTreatmentPayableItemExpectDecision(
      claimProcessData,
      claimEntities,
      treatmentPayableItemId
    );
    const claimPayableItem = claimEntities.claimPayableListMap[claimPayableItemId];
    claimPayableItem.treatmentPayableList = filter(
      claimPayableItem.treatmentPayableList,
      (treatmentPayableId) => treatmentPayableId !== treatmentPayableItemId
    );
    delete claimEntities.treatmentPayableListMap[treatmentPayableItemId];
    deleteErrorMessages.delTreatmentPayableBenefitItem(
      claimEntities.treatmentPayableListMap,
      treatmentPayableItemId
    );
  });

  return { ...nextState };
};

export default deleteTreatmentPayableItem;
