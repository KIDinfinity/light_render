import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { tenant } from '@/components/Tenant';
import { getExchangeRateByCurrency } from '@/services/miscExchangeRateControllerService';
import { ExchangeType } from 'claim/pages/Enum';
import { filterExchangeRateListFn } from 'claim/pages/utils/handleExchangeRate';

export default function* getExchangeRateForPolicy({ payload }: any, { put, select, call }: any) {
  const claimProcessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const claimEntities = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );

  const { claimPayableList, claimDecision } = claimProcessData;
  const { policyCurrency, payableId } = payload;
  const { payoutCurrency } = claimDecision;

  const systemCurrency = tenant.currency();

  const params = {
    exchangeTypeList: [ExchangeType.External],
    fromCurrencyList: [systemCurrency],
    lookupDateList: [],
    toCurrencyList: [systemCurrency],
  };

  params.toCurrencyList.push(payoutCurrency);

  if (payableId) {
    const claimPayableItem = claimEntities.claimPayableListMap[payableId];
    const policyCurrencyVal = claimPayableItem?.policyCurrency || policyCurrency;
    params.fromCurrencyList.push(policyCurrencyVal);
  } else if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    lodash.map(claimPayableList, (claimPayableItemId) => {
      const claimPayableItem = claimEntities.claimPayableListMap[claimPayableItemId];
      const policyCurrencyVal = claimPayableItem?.policyCurrency || policyCurrency;
      params.fromCurrencyList.push(policyCurrencyVal);
    });
  }

  params.fromCurrencyList = lodash.chain(params.fromCurrencyList).uniq().compact().value();
  params.toCurrencyList = lodash.chain(params.toCurrencyList).uniq().compact().value();
  const response = yield call(getExchangeRateByCurrency, params);

  if (response && response.success && response.resultData) {
    const filterExchangeRateList = filterExchangeRateListFn(response.resultData);
    yield put({
      type: 'saveExchangeRate',
      payload: { exchangeRateList: filterExchangeRateList },
    });

    yield put({
      type: 'saveClaimPayablePolicyCurrency',
      payload: {
        policyCurrency,
        payoutCurrency,
        payableId,
      },
    });
    yield put({
      type: 'updatePayableAmountCallback',
    });
  }
  return response;
}
