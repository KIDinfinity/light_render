import lodash from 'lodash';
import moment from 'moment';
import { SS, SSKey } from '@/utils/cache';

import { getExchangeRateByCurrency } from '@/services/miscExchangeRateControllerService';
import { queryRegionDefaultCurrency } from '@/services/miscRegionCurrencyConfigControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const clientInfoList = lodash.get(payload, 'clientInfoList');
  const getLogindConfig =  SS.getItem(SSKey.CONFIGS_LOGINED)?.currencyConfig;
  const annualIncomeCurrencyList = lodash.map(clientInfoList, (item) => item?.annualIncomeCurrency).concat(lodash.map(getLogindConfig, item => item?.currencyCode));

  const response = yield call(queryRegionDefaultCurrency);
  if (!response?.success) {
    return;
  }
  const currencyCode = lodash.get(response, 'resultData.currencyCode');
  yield put.resolve({
    type: 'setCurrencyCode',
    payload: {
      currencyCode,
    },
  });

  const fromCurrency = lodash
    .chain(annualIncomeCurrencyList)
    .difference([currencyCode])
    .uniq()
    .compact()
    .value();
  if (fromCurrency.length === 0) {
    return;
  }
  const lookupDate = moment().format();
  const exchangeRateResopnse = yield call(getExchangeRateByCurrency, {
    exchangeTypeList: ['E'],
    fromCurrencyList: fromCurrency,
    toCurrencyList: [currencyCode],
    lookupDate: lookupDate,
    lookupDateList: [lookupDate],
  });
  if (!exchangeRateResopnse?.success) {
    return;
  }
  const exchangeRate = lodash.reduce(
    fromCurrency,
    (result, item, index) => {
      return (result = {
        ...result,
        [item]: exchangeRateResopnse?.resultData?.[index]?.exchangeRate,
      });
    },
    {}
  );
  yield put.resolve({
    type: 'setExchangeRate',
    payload: {
      exchangeRate
    },
  });
}
