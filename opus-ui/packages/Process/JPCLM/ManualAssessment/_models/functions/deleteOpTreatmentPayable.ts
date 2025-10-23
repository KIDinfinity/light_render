
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default ({ draftState, treatmentId, outpatientTreatmentDate, diagnosisCodes }: any) => {

  return lodash
    .filter(
      draftState.claimEntities.opTreatmentPayableListMap,
      (payable) => {
        if (outpatientTreatmentDate) {
          return payable.treatmentId === treatmentId &&
            payable.dateOfConsultation === formUtils.queryValue(outpatientTreatmentDate)
        }
        if (diagnosisCodes) {
          return payable.treatmentId === treatmentId &&
            !lodash.includes(formUtils.cleanValidateData(diagnosisCodes), formUtils.queryValue(payable?.diagnosisCode))
        }
        return false
      }
    )
    .map((payable) => ({ id: payable.id, parentId: payable.treatmentPayableId }))
    .forEach((payable) => {
      draftState.claimEntities.treatmentPayableListMap[
        payable.parentId
      ].opTreatmentPayableList = lodash.filter(
        draftState?.claimEntities?.treatmentPayableListMap?.[payable?.parentId]?.opTreatmentPayableList,
        (item) => item !== payable.id
      );
      delete draftState?.claimEntities?.opTreatmentPayableListMap?.[payable?.id];
    });

};
