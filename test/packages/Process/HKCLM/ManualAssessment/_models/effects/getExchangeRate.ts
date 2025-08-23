import { getLatestExchangeRate } from '@/services/miscExchangeRateControllerService';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { shallowEqual } from 'react-redux';

export default function* getExchangeRate({ payload }: any, { put, select, call }: any) {
  const searchedDate = new Set();
  const dateList = payload?.dateList || [];
  const params = {
    lookupDateList: dateList.filter((date: string) => {
      if (searchedDate.has(date)) {
        return false;
      } else {
        searchedDate.add(date);
        return true;
      }
    }),
  };

  if (!params.lookupDateList.length) return false;
  const response = yield call(getLatestExchangeRate, params);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    const exchangeRate = resultData.map((item: any) => {
      return lodash
        .chain(item)
        .pick(['fromCurrency', 'toCurrency', 'exchangeRate', 'exchangeType', 'effectiveDate'])
        .value();
    });
    const currentExchangeRate = yield select(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.exchangeRate
    );
    let appendExchangeRate = [];
    if (currentExchangeRate) {
      appendExchangeRate = exchangeRate.filter((exchangeRateItem) => {
        return !currentExchangeRate.some((item) => shallowEqual(item, exchangeRateItem));
      });
    } else {
      appendExchangeRate = exchangeRate;
    }

    if (!appendExchangeRate.length) {
      return false;
    }

    yield put({
      type: 'saveAllExchangeRate',
      payload: appendExchangeRate,
    });

    return true;
  }
  return false;
}
