import lodash from 'lodash';
import { requestRefundAmount } from '@/services/claimJpLifejBoControllerService';

export default function* getRefundAmount({ payload }: any, { call, put, select }: any) {
  const { policyNo } = payload;

  // const response = {
  //   success: true,
  //   resultData: {
  //     refundAmount: 1000,
  //   },
  // };

  const response = yield call(requestRefundAmount, policyNo);

  if (response && response.success && lodash.isPlainObject(response?.resultData)) {
    yield put({
      type: 'saveRefundAmount',
      payload: {
        refundAmount: {
          [policyNo]: response?.resultData?.refundAmount,
        },
      },
    });
  }
}
