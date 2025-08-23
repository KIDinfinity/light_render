import { produce } from 'immer';

const saveDateOfTreatmentItemReducer = (state: any, action: any) => {
  const { changedFields, treatmentDateId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.jpTreatmentDateListMap[treatmentDateId] = {
      ...state.claimEntities.jpTreatmentDateListMap[treatmentDateId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default saveDateOfTreatmentItemReducer;
