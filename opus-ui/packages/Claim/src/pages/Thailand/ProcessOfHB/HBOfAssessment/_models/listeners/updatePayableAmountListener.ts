
export default function* updatePayableAmountListener(_, { put, throttle }: any) {
  yield throttle(
    300,
    [
      'hbOfClaimAssessmentController/saveClaimPayableItem',
      'hbOfClaimAssessmentController/saveTreatmentPayableItem',
      'hbOfClaimAssessmentController/saveBenefitPayableItem',
      'hbOfClaimAssessmentController/removeClaimPayableItem',
      'hbOfClaimAssessmentController/removeTreatmentPayableItem',
      'hbOfClaimAssessmentController/removeInvoicePayableItem',
      'hbOfClaimAssessmentController/deleteBenefitPayableItem',
    ],
    function* action() {
      yield put({
        type: 'updatePayableAmountCallback',
      });
    }
  );
}
