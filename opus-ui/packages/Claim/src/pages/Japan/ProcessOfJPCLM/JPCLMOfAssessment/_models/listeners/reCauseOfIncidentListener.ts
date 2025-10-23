import lodash from 'lodash';

const checkChangedFields = (changedFields: any) =>
  lodash.has(changedFields, 'incidentDate') ||
  lodash.has(changedFields, 'dateOfAdmission') ||
  lodash.has(changedFields, 'diagnosisCode') ||
  lodash.has(changedFields, 'diagnosisType');

export default function* reCauseOfIncidentListener(_: any, { put, throttle }: any) {
  yield throttle(
    500,
    [
      'JPCLMOfClaimAssessmentController/saveIncidentItem',
      'JPCLMOfClaimAssessmentController/saveDiagnosisItem',
      'JPCLMOfClaimAssessmentController/saveTreatmentItem',
      'JPCLMOfClaimAssessmentController/removeTreatmentItem',
      'JPCLMOfClaimAssessmentController/removeDiagnosisItem',
    ],
    function* action(ac: any) {
      const { changedFields, incidentId } = ac.payload;
      if ((changedFields && checkChangedFields(changedFields)) || (!changedFields && incidentId)) {
        yield put({
          type: 'judgmentOfCauseOfIncident',
          payload: ac.payload,
        });
      }
    }
  );
}
