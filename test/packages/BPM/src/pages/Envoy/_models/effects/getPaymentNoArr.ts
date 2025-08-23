import { getPaymentNoByBatchClaimNo } from '@/services/claimHospitalBillingBatchControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

function* getPaymentNoArr(_: any, { select, call, put }: any) {
  const { businessNo } = yield select((state: any) => state.envoyController);
  const paymentNoResponse = yield call(
    getPaymentNoByBatchClaimNo,
    objectToFormData({
      hospitalBatchClaimNo: businessNo,
    })
  );
  if (paymentNoResponse && paymentNoResponse.success) {
    yield put({
      type: 'savePaymentNoArr',
      payload: {
        paymentNoArr: paymentNoResponse.resultData,
      },
    });
  }
}

export default getPaymentNoArr;
