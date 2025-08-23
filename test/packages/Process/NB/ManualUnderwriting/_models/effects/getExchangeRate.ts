import lodash from 'lodash';
import moment from 'moment';
import { getExchangeRateByCurrency } from '@/services/miscExchangeRateControllerService';
import { NAMESPACE } from '../../activity.config';

export default function* ({ payload }: any, { call, put,select }: any) {
  const { fromCurrency } = payload;
  const currencyCode = yield select (
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.currencyCode
  );
  if (fromCurrency && currencyCode && fromCurrency !== currencyCode) {
    const res = yield call(getExchangeRateByCurrency, {
      exchangeTypeList: ['E'],
      fromCurrencyList: [fromCurrency],
      toCurrencyList: [currencyCode],
      lookupDate: moment().format(),
      lookupDateList: [moment().format()],
    });
    const exchangeRate = lodash.get(res, 'resultData[0].exchangeRate', 1);
    yield put.resolve({
      type: 'setExchangeRate',
      payload: {
        exchangeRate,
        fromCurrency,
      },
    });
    return exchangeRate;
  }
}
