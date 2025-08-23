import { NAMESPACE } from '../../activity.config';

export default function* updatePayableAmountListener(_, { put, throttle }: any) {
  yield throttle(
    300,
    [
      `${NAMESPACE}/benefitItemGroupUpdate`,
      `${NAMESPACE}/addPayableItem`,
      `${NAMESPACE}/benefitItemGroupDelete`,
      `${NAMESPACE}/benefitTypeGroupDelete`,
      `${NAMESPACE}/removeServicePayableItem`,
      `${NAMESPACE}/removeProcedurePayableItem`,
      `${NAMESPACE}/removeTreatmentPayableItem`,
      `${NAMESPACE}/savePayeeItem`,
      `${NAMESPACE}/removePayeeItem`,
      `${NAMESPACE}/saveServicePayableItem`,
      `${NAMESPACE}/hideDecisionModal`,
      `${NAMESPACE}/saveSummaryTreatmentPayable`,
      `${NAMESPACE}/saveOtherProcedurePayableItem`,
      `${NAMESPACE}/totalBenefitTypeBasicUpdate`,
      `${NAMESPACE}/payableSeriesDelete`,
      `${NAMESPACE}/payableItemDelete`,
      `${NAMESPACE}/benefitItemRecover`,
      `${NAMESPACE}/saveProcedurePayableItem`,
    ],
    function* action() {
      yield put({
        type: 'updatePayableAmountCallback',
      });
    }
  );
}
