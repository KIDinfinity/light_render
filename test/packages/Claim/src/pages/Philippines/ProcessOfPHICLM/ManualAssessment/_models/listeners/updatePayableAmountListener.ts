export default function* updatePayableAmountListener(_, { put, throttle }: any) {
  yield throttle(
    300,
    [
      'PHCLMOfClaimAssessmentController/saveClaimPayableItem',
      'PHCLMOfClaimAssessmentController/saveTreatmentPayableItem',
      'PHCLMOfClaimAssessmentController/saveBenefitPayableItem',
      'PHCLMOfClaimAssessmentController/removeClaimPayableItem',
      'PHCLMOfClaimAssessmentController/removeTreatmentPayableItem',
      'PHCLMOfClaimAssessmentController/removeInvoicePayableItem',
      'PHCLMOfClaimAssessmentController/removeBenefitPayableItem',
      'PHCLMOfClaimAssessmentController/savePayeeItem',
      'PHCLMOfClaimAssessmentController/removePayeeItem',
      'PHCLMOfClaimAssessmentController/saveBeneficiaryItem',
      'PHCLMOfClaimAssessmentController/removeBeneficiaryItem',
      'PHCLMOfClaimAssessmentController/hideDecisionModal',
      'PHCLMOfClaimAssessmentController/saveAccidentBenefitPayableItem',
      'PHCLMOfClaimAssessmentController/removeAccidentBenefitPayableItem',
    ],
    function* action() {
      yield put({
        type: 'updatePayableAmountCallback',
      });
    }
  );
}
