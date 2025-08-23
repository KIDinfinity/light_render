import { produce } from 'immer';
import lodash from 'lodash';

const removeDateOfTreatmentItem = (state: any, action: any) => {
  const { medicineId, treatmentDateId } = action.payload;

  const newDateOfTreatmentList = lodash.filter(
    state.claimEntities.jpMedicineTreatmentListMap[medicineId].jpTreatmentDateList,
    (item) => item !== treatmentDateId
  );

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.jpMedicineTreatmentListMap[
      medicineId
    ].jpTreatmentDateList = newDateOfTreatmentList;
    delete draftState.claimEntities.jpTreatmentDateListMap[treatmentDateId];
  });

  return { ...nextState };
};

export default removeDateOfTreatmentItem;
