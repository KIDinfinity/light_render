import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { deleteOpTreatmentPayable } from 'process/JPCLM/ManualAssessment/_models/functions'

const saveDiagnosisItem = (state: any, action: any) => {
  const { changedFields, diagnosisId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    const tempDiagnosis = {
      ...draftState.claimEntities.diagnosisListMap[diagnosisId],
      ...finalChangedFields,
    };

    if (lodash.size(changedFields) > 1) {
      draftState.claimEntities.diagnosisListMap[diagnosisId] = tempDiagnosis;
      return;
    }

    if (
      lodash.has(changedFields, 'criticalIllness') &&
      lodash.isBoolean(formUtils.queryValue(changedFields.criticalIllness))
    ) {
      tempDiagnosis.criticalIllness = formUtils.queryValue(changedFields.criticalIllness)
        ? 1
        : 0;
      // TODO 如何保留上次输入
      tempDiagnosis.criticalIllnessName = '';
    }

    if (lodash.has(changedFields, 'diagnosisName') && lodash.size(changedFields) === 1) {
      const treatmentList = draftState?.claimEntities?.incidentListMap?.[tempDiagnosis?.incidentId]?.treatmentList
      if (lodash.size(treatmentList)) {
        const diagnosisCodes = lodash
          .chain(formUtils.cleanValidateData(draftState?.claimEntities?.diagnosisListMap))
          .filter((item) => item.incidentId === tempDiagnosis?.incidentId)
          .map('diagnosisCode')
          .compact()
          .value()
        lodash.forEach(treatmentList, (treatmentId) => {
          deleteOpTreatmentPayable({ draftState, treatmentId, diagnosisCodes })
        })
      }
    }
    draftState.claimEntities.diagnosisListMap[diagnosisId] = tempDiagnosis;
  });
  return { ...nextState };
};

export default saveDiagnosisItem;
