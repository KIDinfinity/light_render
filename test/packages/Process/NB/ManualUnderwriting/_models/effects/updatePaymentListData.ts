import lodash from 'lodash';
import { refresh } from '@/services/owbNbPremiumEnquiryControllerService';
import { NAMESPACE } from '../../activity.config';

export default function* (_, { call, put, select }: any) {
  const applicationNo = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.applicationNo
  );
  const response = yield call(refresh, { applicationNo });

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && lodash.isPlainObject(resultData)) {
    const paymentListData: any = lodash
      .chain(resultData)
      .mapValues((item) => {
        if (lodash.isArray(item)) {
          return item;
        } else {
          return lodash.toNumber(item).toFixed(2);
        }
      })
      .value();
    const { policyInitialPremium, paidAmount } = lodash.pick(paymentListData, [
      'policyInitialPremium',
      'paidAmount',
    ]);

    yield put({
      type: 'setPaymentListData',
      payload: {
        paymentListData: {
          policyInitialPremium,
          paidAmount,
        },
      },
    });
  }
}
