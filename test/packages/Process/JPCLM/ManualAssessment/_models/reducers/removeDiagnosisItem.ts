import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { deleteOpTreatmentPayable } from 'process/JPCLM/ManualAssessment/_models/functions'

const removeDiagnosisItem = (state: any, action: any) => {
  const { incidentId, diagnosisId } = action.payload;
  const newDiagnosisList = lodash.filter(
    state.claimEntities.incidentListMap[incidentId].diagnosisList,
    (item) => item !== diagnosisId
  );

  const nextState = produce(state, (draftState) => {
    const treatmentList = draftState?.claimEntities?.incidentListMap?.[incidentId]?.treatmentList

    draftState.claimEntities.incidentListMap[incidentId].diagnosisList = newDiagnosisList;
    delete draftState.claimEntities.diagnosisListMap[diagnosisId];


    if (lodash.size(treatmentList)) {
      const diagnosisCodes = lodash
        .chain(formUtils.cleanValidateData(draftState?.claimEntities?.diagnosisListMap))
        .filter((item) => item.incidentId === incidentId)
        .map('diagnosisCode')
        .compact()
        .value()

      lodash.forEach(treatmentList, (treatmentId) => {
        deleteOpTreatmentPayable({ draftState, treatmentId, diagnosisCodes })
      })
    }
  });

  return { ...nextState };
};

export default removeDiagnosisItem;
