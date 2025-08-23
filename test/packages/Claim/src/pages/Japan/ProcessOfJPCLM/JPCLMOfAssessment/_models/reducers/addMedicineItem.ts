import { produce } from 'immer';

const addMedicineItem = (state: any, action: any) => {
  const { treatmentId, addMedicineItem, addTreatmentDateItem } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (!draftState.claimEntities.treatmentListMap[treatmentId].jpMedicineTreatmentList) {
      draftState.claimEntities.treatmentListMap[treatmentId].jpMedicineTreatmentList = [];
    }

    draftState.claimEntities.treatmentListMap[treatmentId].jpMedicineTreatmentList = [
      ...draftState.claimEntities.treatmentListMap[treatmentId].jpMedicineTreatmentList,
      addMedicineItem.id,
    ];
    draftState.claimEntities.jpMedicineTreatmentListMap[addMedicineItem.id] = addMedicineItem;

    draftState.claimEntities.jpTreatmentDateListMap[addTreatmentDateItem.id] = addTreatmentDateItem;
  });

  return { ...nextState };
};

export default addMedicineItem;
