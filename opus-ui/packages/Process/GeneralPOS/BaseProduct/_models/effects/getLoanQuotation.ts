import { getLoanQuotation } from '@/services/posSrvCaseInquiryControllerService';
import lodash from 'lodash';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { formUtils } from 'basic/components/Form';
export default function* getAddress({ payload = {} }, { call, put, select }: any) {
  const { transactionId, payableAmount } = payload;
  const policyLoan = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.policyLoan
  );
  if (
    payableAmount &&
    lodash.isEqual(formUtils.queryValue(policyLoan?.payableAmount), payableAmount)
  )
    return; //区分值不变的时候不call
  const response = yield call(getLoanQuotation, {
    ...policyLoan,
    loanRequest: formUtils.queryValue(policyLoan?.loanRequest),
    payableAmount: payableAmount ? payableAmount : formUtils.queryValue(policyLoan?.payableAmount),
  });
  if (response?.success && response?.resultData) {
    yield put({
      type: 'policyLoanInit',
      payload: {
        transactionId,
        policyLoan: response?.resultData,
      },
    });
  }
}
