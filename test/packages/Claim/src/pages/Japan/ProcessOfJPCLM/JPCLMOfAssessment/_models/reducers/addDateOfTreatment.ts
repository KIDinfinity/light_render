import { produce } from 'immer';

const addDateOfTreatment = (state: any, action: any) => {
  const { medicineId, addDateOfTreatmentItem } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (!draftState.claimEntities.jpMedicineTreatmentListMap[medicineId].jpTreatmentDateList) {
      draftState.claimEntities.jpMedicineTreatmentListMap[medicineId].jpTreatmentDateList = [];
    }

    draftState.claimEntities.jpMedicineTreatmentListMap[medicineId].jpTreatmentDateList = [
      ...draftState.claimEntities.jpMedicineTreatmentListMap[medicineId].jpTreatmentDateList,
      addDateOfTreatmentItem.id,
    ];
    draftState.claimEntities.jpTreatmentDateListMap[
      addDateOfTreatmentItem.id
    ] = addDateOfTreatmentItem;
  });

  return { ...nextState };
};

export default addDateOfTreatment;
