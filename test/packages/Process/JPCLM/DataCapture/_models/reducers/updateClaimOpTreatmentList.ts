import { produce }  from 'immer';
import lodash from 'lodash';

const updateClaimOpTreatmentList = (state: any, action: any) => {
  const { index, treatmentId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;
    const newOpTreatmentList = lodash.remove(
      draft.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList,
      (value, ind) => {
        return ind !== index;
      }
    );

    draft.claimEntities.treatmentListMap[treatmentId].opTreatmentList = [
      ...(newOpTreatmentList || []),
    ];
  });

  return { ...nextState };
};

export default updateClaimOpTreatmentList;
