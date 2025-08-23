import { produce } from 'immer';
import { get } from 'lodash';
import { deleteErrorMessages } from '../functions';

const deleteTreatmentPayableAddItem = (state) => {
  const nextState = produce(state, (draftState) => {
    deleteErrorMessages.delTreatmentPayableBenefitItem(
      draftState.claimEntities.treatmentPayableListMap,
      get(draftState, 'treatmentPayableAddItem.id')
    );
    draftState.treatmentPayableAddItem = null;
  });

  return { ...nextState };
};

export default deleteTreatmentPayableAddItem;
