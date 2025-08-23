import { refreshEffectiveDate } from '@/services/posSrvCaseInquiryControllerService';
import { TransactionTypeEnum } from 'process/GeneralPOS/common/Enum';

const transactionTypeMap = {
  [TransactionTypeEnum.SRV011]: 'policySurrenderUpdate',
};

export default function* refreshDate({ payload }: any, { put, select, call }: any) {
  const { date, transactionId, transactionType, field } = payload;
  const businessNo = yield select(({ processTask }: any) => processTask.getTask?.businessNo);

  const params = { businessNo, effectiveDate: date };
  const response = yield call(refreshEffectiveDate, params);

  if (response.success && response?.resultData?.effectiveDate) {
    yield put({
      type: 'transactionInfoUpdate',
      payload: {
        changedFields: { effectiveDate: response?.resultData?.effectiveDate },
        transactionId,
      },
    });
    yield put({
      type: transactionTypeMap[transactionType],
      payload: {
        changedFields: { [field]: response?.resultData?.effectiveDate },
        transactionId,
        validating: false,
      },
    });
  }
}
