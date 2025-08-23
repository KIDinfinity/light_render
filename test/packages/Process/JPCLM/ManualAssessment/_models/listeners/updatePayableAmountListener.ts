export default function* updatePayableAmountListener(_, { put, throttle }: any) {
  yield throttle(
    300,
    [
      'JPCLMOfClaimAssessment/saveClaimPayableItem',
      'JPCLMOfClaimAssessment/saveTreatmentPayableItem',
      'JPCLMOfClaimAssessment/saveServicePayableItem',
      'JPCLMOfClaimAssessment/saveOtherProcedurePayableItem',
      'JPCLMOfClaimAssessment/saveProcedurePayableItem',
      'JPCLMOfClaimAssessment/removeClaimPayableItem',
      'JPCLMOfClaimAssessment/removeTreatmentPayableItem',
      'JPCLMOfClaimAssessment/removeOtherProcedurePayableItem',
      'JPCLMOfClaimAssessment/removeProcedurePayableItem',
      'JPCLMOfClaimAssessment/removeInvoicePayableItem',
      'JPCLMOfClaimAssessment/removeServicePayableItem',
      'JPCLMOfClaimAssessment/savePayeeItem',
      'JPCLMOfClaimAssessment/removePayeeItem',
      'JPCLMOfClaimAssessment/saveBeneficiaryItem',
      'JPCLMOfClaimAssessment/removeBeneficiaryItem',
      'JPCLMOfClaimAssessment/hideDecisionModal',
      'JPCLMOfClaimAssessment/saveOPTreatmentPayableItem',
      'JPCLMOfClaimAssessment/saveAdjOpTreatmentPayableItem',
      'JPCLMOfClaimAssessment/updataPayableAmount',
      'JPCLMOfClaimAssessment/removeOPTreatmentPayableItem',
      'JPCLMOfClaimAssessment/saveClaimIncidentPayableItem',
      "JPCLMOfClaimAssessment/removeClaimIncidentPayableItem"
    ],
    function* action() {
      yield put({
        type: 'updatePayableAmountCallback',
      });
    }
  );
}
