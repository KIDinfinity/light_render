export default function* updatePayableAmountListener(_, { put, throttle }: any) {
  yield throttle(
    300,
    [
      // 'daOfClaimAssessmentController/saveClaimPayableItem',
      'daOfClaimAssessmentController/saveTreatmentPayableItem',
      'daOfClaimAssessmentController/saveBenefitPayableItem',
      'daOfClaimAssessmentController/removeClaimPayableItem',
      'daOfClaimAssessmentController/removeTreatmentPayableItem',
      'daOfClaimAssessmentController/removeInvoicePayableItem',
      'daOfClaimAssessmentController/deleteBenefitPayableItem',
      'daOfClaimAssessmentController/saveAccidentBenefitPayableItem',
      'daOfClaimAssessmentController/removeAccidentBenefitPayableItem',
      'daOfClaimAssessmentController/hideDecisionModal',
      'daOfClaimAssessmentController/saveInvoicePayableItem',
    ],
    function* action() {
      yield put({
        type: 'updatePayableAmountCallback',
      });
    }
  );
}
