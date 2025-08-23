import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const updateClaimOpTreatmentList = (state: any, action: any) => {
  const { index, treatmentId, outpatientTreatmentDate } = action.payload;
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

    lodash
      .filter(
        draftState.claimEntities.opTreatmentPayableListMap,
        (payable) =>
          payable.treatmentId === treatmentId &&
          payable.dateOfConsultation === formUtils.queryValue(outpatientTreatmentDate)
      )
      .map((payable) => ({ id: payable.id, parentId: payable.treatmentPayableId }))
      .forEach((payable) => {
        draftState.claimEntities.treatmentPayableListMap[
          payable.parentId
        ].opTreatmentPayableList = lodash.filter(
          draftState.claimEntities.treatmentPayableListMap[payable.parentId].opTreatmentPayableList,
          (item) => item !== payable.id
        );
        delete draftState.claimEntities.opTreatmentPayableListMap[payable.id];
      });
  });

  return { ...nextState };
};

export default updateClaimOpTreatmentList;
