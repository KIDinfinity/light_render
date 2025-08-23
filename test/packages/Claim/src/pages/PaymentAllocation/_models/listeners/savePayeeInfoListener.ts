import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { getPaymentMethodIn } from '../../_function';

export default function* savePayeeInfoListener(_: any, { put, takeLatest }: any) {
  yield takeLatest(
    ['paymentAllocation/savePayeeInfo', 'paymentAllocation/saveBeneficiary'],
    function* action({ payload }: any) {
      const { changedFields } = payload;
      const editStatus = lodash.keys(changedFields).length === 1;

      const paymentMethod = formUtils.queryValue(changedFields.paymentMethod);
      const editPaymentMethod =
        lodash.has(changedFields, 'paymentMethod') && getPaymentMethodIn({ paymentMethod });

      if (
        editStatus &&
        (lodash.has(changedFields, 'payByPolicyCurrency') ||
          lodash.has(changedFields, 'payoutCurrency') ||
          lodash.has(changedFields, 'payeeId') ||
          editPaymentMethod)
      ) {
        yield put({
          type: 'updateExchangeRate',
          payload,
        });
      }

      if (editStatus && lodash.has(changedFields, 'payoutAmount')) {
        yield put({
          type: 'updateRedepositPolicyList',
        });
      }
      if (
        editStatus &&
        (lodash.has(changedFields, 'paymentMethod') ||
          lodash.has(changedFields, 'subPaymentMethod'))
      ) {
        yield put({
          type: 'getOwnerPolicyList',
        });
      }
    }
  );
}
