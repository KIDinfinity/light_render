import { produce }  from 'immer';

const removeTreatmentPayableAddItem = (state: any, action: any) => {
  const nextState = produce(state, (draftState) => {
    draftState.treatmentPayableAddItem = null;
  });

  return { ...nextState };
};

export default removeTreatmentPayableAddItem;
