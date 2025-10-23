import { produce } from 'immer';

const saveMedicineListItem = (state: any, action: any) => {
  const { changedFields, medicineId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.jpMedicineTreatmentListMap[medicineId] = {
      ...state.claimEntities.jpMedicineTreatmentListMap[medicineId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default saveMedicineListItem;
