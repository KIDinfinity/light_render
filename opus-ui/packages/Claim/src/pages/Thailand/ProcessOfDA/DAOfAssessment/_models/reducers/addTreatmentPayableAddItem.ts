import { produce } from 'immer';

const addTreatmentPayableAddItem = (state: any, action: any) => {
  const { addTreamentPayableItem } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.treatmentPayableAddItem = addTreamentPayableItem;
  });
  return { ...nextState };
};

export default addTreatmentPayableAddItem;
