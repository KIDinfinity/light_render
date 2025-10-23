import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { tenant } from '@/components/Tenant';
import { ExchangeType } from 'claim/pages/Enum';
import { filterExchangeRateListFn,filterAllExchangeRates } from 'claim/pages/utils/handleExchangeRate';

export default function* getExchangeRateForPolicy({ payload }: any, { put, select, call }: any) {
  const claimProcessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const claimEntities = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );
  const exchangeRate = yield select(  ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.exchangeRate)
  const { claimPayableList, claimDecision } = claimProcessData;
  const { policyCurrency, payableId } = payload;
  const { payoutCurrency } = claimDecision;

  const systemCurrency = tenant.currency();

  const params = {
    exchangeTypeList: ExchangeType.External,
    fromCurrencyList: null,
    toCurrencyList: systemCurrency,
  };

  if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    lodash.map(claimPayableList, (claimPayableItemId) => {
      const claimPayableItem = claimEntities.claimPayableListMap[claimPayableItemId];
      const policyCurrencyVal = claimPayableItem?.policyCurrency
      params.fromCurrencyList=policyCurrencyVal;
    });
  }
  const response =filterAllExchangeRates(exchangeRate,params,true)

  if (response) {
    const filterExchangeRateList = filterExchangeRateListFn(response);
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
