import { inquiry } from '@/services/posSrvAmountControllerService';

export default function* getLimitDataByType({ payload }, { put, call }: any) {
  const { companyCode, limitType, currency } = payload;
  const result = yield call(inquiry, {
    companyCode,
    limitType,
    currency,
  });

  if (result.success) {
    yield put({
      type: 'saveLimitData',
      payload: {
        data: result.resultData,
        limitType,
      },
    });
  }
}
