import { produce } from 'immer';

const removeTreatmentPayableAddItem = (state: any) => {
  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    draftState.treatmentPayableAddItem = null;
  });

  return { ...nextState };
};

export default removeTreatmentPayableAddItem;
