import { produce } from 'immer';
import lodash from 'lodash';

const removeMedicineItem = (state: any, action: any) => {
  const { treatmentId, medicineId } = action.payload;

  const newMedicineList = lodash.filter(
    state.claimEntities.treatmentListMap[treatmentId].jpMedicineTreatmentList,
    (item) => item !== medicineId
  );

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.treatmentListMap[
      treatmentId
    ].jpMedicineTreatmentList = newMedicineList;
    delete draftState.claimEntities.jpMedicineTreatmentListMap[medicineId];
  });

  return { ...nextState };
};

export default removeMedicineItem;
