export default function* updatePayableAmountListener(_: any, { put, throttle }: any) {
  yield throttle(
    300,
    [
      'JPCLMOfClaimAssessmentController/saveIncidentPayableItem',
      'JPCLMOfClaimAssessmentController/saveTreatmentPayableItem',
      'JPCLMOfClaimAssessmentController/deleteIncidentPayableItem',
      'JPCLMOfClaimAssessmentController/deleteTreatmentPayableItem',
      'JPCLMOfClaimAssessmentController/removeIncidentItem',
      'JPCLMOfClaimAssessmentController/removeTreatmentItem',
      'JPCLMOfClaimAssessmentController/hideDecisionModal',
    ],
    function* action() {
      yield put({
        type: 'updatePayableAmountCallback',
      });
    }
  );
}
