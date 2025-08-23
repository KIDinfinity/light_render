import { NAMESPACE } from '../../activity.config';

export default function* updatePayableAmountListener(_, { put, throttle }: any) {
  yield throttle(
    300,
    [
      `${NAMESPACE}/benefitItemGroupUpdate`,
      `${NAMESPACE}/benefitTypeGroupUpdate`,
      `${NAMESPACE}/addPayableItem`,
      `${NAMESPACE}/benefitItemGroupDelete`,
      `${NAMESPACE}/removeServicePayableItem`,
      `${NAMESPACE}/savePayeeItem`,
      `${NAMESPACE}/removePayeeItem`,
      `${NAMESPACE}/saveServicePayableItem`,
      `${NAMESPACE}/hideDecisionModal`,
    ],
    function* action() {
      yield put({
        type: 'updatePayableAmountCallback',
      });
    }
  );
}
