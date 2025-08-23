export default function* updatePayableAmountListener(_, { put, throttle }: any) {
  yield throttle(
    300,
    [
      'PHCLMOfAppealCaseController/saveClaimPayableItem',
      'PHCLMOfAppealCaseController/saveTreatmentPayableItem',
      'PHCLMOfAppealCaseController/saveBenefitPayableItem',
      'PHCLMOfAppealCaseController/saveInvoicePayableItem',
      'PHCLMOfAppealCaseController/removeClaimPayableItem',
      'PHCLMOfAppealCaseController/removeTreatmentPayableItem',
      'PHCLMOfAppealCaseController/removeInvoicePayableItem',
      'PHCLMOfAppealCaseController/removeBenefitPayableItem',
      'PHCLMOfAppealCaseController/hideDecisionModal',
      'PHCLMOfAppealCaseController/saveAccidentBenefitPayableItem',
      'PHCLMOfAppealCaseController/removeAccidentBenefitPayableItem',
    ],
    function* action() {
      yield put({
        type: 'updatePayableAmountCallback',
      });
    }
  );
}
