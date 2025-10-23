import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

export default function* updatePayableAmountListener(_, { put, throttle }: any) {
  yield throttle(
    300,
    [
      `${NAMESPACE}/saveClaimPayableItem`,
      `${NAMESPACE}/saveLifePayable`,
      `${NAMESPACE}/saveTreatmentPayableItem`,
      `${NAMESPACE}/saveServicePayableItem`,
      `${NAMESPACE}/saveOtherProcedurePayableItem`,
      `${NAMESPACE}/saveProcedurePayableItem`,
      `${NAMESPACE}/removeClaimPayableItem`,
      `${NAMESPACE}/removeTreatmentPayableItem`,
      `${NAMESPACE}/removeOtherProcedurePayableItem`,
      `${NAMESPACE}/removeProcedurePayableItem`,
      `${NAMESPACE}/removeInvoicePayableItem`,
      `${NAMESPACE}/removeServicePayableItem`,
      `${NAMESPACE}/savePayeeItem`,
      `${NAMESPACE}/removePayeeItem`,
      `${NAMESPACE}/saveBeneficiaryItem`,
      `${NAMESPACE}/removeBeneficiaryItem`,
      `${NAMESPACE}/hideDecisionModal`,
      `${NAMESPACE}/saveOPTreatmentPayableItem`,
      `${NAMESPACE}/saveAdjOpTreatmentPayableItem`,
      `${NAMESPACE}/updataPayableAmount`,
      `${NAMESPACE}/removeOPTreatmentPayableItem`,
      `${NAMESPACE}/saveClaimIncidentPayableItem`,
      `${NAMESPACE}/removeClaimIncidentPayableItem`,
      `${NAMESPACE}/removeLifePayableItem`,
      `${NAMESPACE}/addPayableItem`,
      `${NAMESPACE}/opTreatmentListDelete`,
      `${NAMESPACE}/removeProcedureItem`,
      `${NAMESPACE}/otherProcedureDelete`,
      `${NAMESPACE}/removeServiceItem`,
      `${NAMESPACE}/popupDataConfirm`,
    ],
    function* action() {
      yield put({
        type: 'updatePayableAmountCallback',
      });
    }
  );
}
