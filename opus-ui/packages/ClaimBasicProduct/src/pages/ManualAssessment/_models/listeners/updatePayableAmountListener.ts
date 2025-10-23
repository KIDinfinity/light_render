
export default function* updatePayableAmountListener(_, { put, throttle }: any) {
  yield throttle(
    300,
    [
      'bpOfClaimAssessmentController/saveClaimPayableItem',
      'bpOfClaimAssessmentController/saveTreatmentPayableItem',
      'bpOfClaimAssessmentController/saveServicePayableItem',
      'bpOfClaimAssessmentController/removeClaimPayableItem',
      'bpOfClaimAssessmentController/removeTreatmentPayableItem',
      'bpOfClaimAssessmentController/removeInvoicePayableItem',
      'bpOfClaimAssessmentController/removeServicePayableItem',
      'bpOfClaimAssessmentController/savePayeeItem',
      'bpOfClaimAssessmentController/removePayeeItem',
      'bpOfClaimAssessmentController/saveBeneficiaryItem',
      'bpOfClaimAssessmentController/removeBeneficiaryItem',
      'bpOfClaimAssessmentController/hideDecisionModal',
    ],
    function* action() {
      yield put({
        type: 'updatePayableAmountCallback',
      });
    }
  );
}
