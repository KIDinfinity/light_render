import lodash from 'lodash';
import { queryRegionDefaultCurrency } from '@/services/miscRegionCurrencyConfigControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const response = yield call(queryRegionDefaultCurrency);
  const currencyCode = lodash.get(response, 'resultData.currencyCode');
  yield put.resolve({
    type: 'setCurrencyCode',
    payload: {
      currencyCode,
    },
  });
  return currencyCode;
}
