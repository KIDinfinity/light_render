import { produce } from 'immer';
import{ v4 as  uuidv4 } from 'uuid';
import { TREATMENTPAYABLEITEM } from 'claim/pages/utils/claimConstant';
import { SwitchEnum } from 'claim/pages/utils/claim';

const addTreatmentPayableItem = (state, action) => {
  const { incidentId, treatmentId, claimNo } = action.payload;

  const payableAddItem = {
    ...TREATMENTPAYABLEITEM,
    claimNo,
    id: uuidv4(),
    incidentId,
    treatmentId,
    manualAdd: SwitchEnum.YES,
  };

  const nextState = produce(state, (draftState) => {
    draftState.treatmentPayableAddItem = payableAddItem;
  });

  return { ...nextState };
};

export default addTreatmentPayableItem;
