import { produce }  from 'immer';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { ExchangeType } from 'claim/pages/Enum';
import saveExchangeRate from './saveExchangeRate';
import saveClaimPayablePolicyCurrency from './saveClaimPayablePolicyCurrency';
import updatePayableAmountCallback from './updatePayableAmountCallback';
const hanldExchangeRateForPolicy = (state: any) => {
  return produce(state, (draftState: any) => {
    const {
      claimProcessData: { claimPayableList, claimDecision },
      claimEntities,
      exchangeRate,
    } = draftState;
    const systemCurrency = tenant.currency();

    const payableExchangeRateFilterList = lodash
      .chain(claimPayableList)
      .map((claimPayableItemId) =>
        lodash.get(claimEntities, `claimPayableListMap.${claimPayableItemId}.policyCurrency`)
      )
      .uniq()
      .compact()
      .map((currency) => ({
        exchangeType: ExchangeType.External,
        fromCurrency: currency,
        toCurrency: systemCurrency,
      }))
      .value();

    const filterExchangeRateList = lodash
      .chain(exchangeRate)
      .filter((exchangeRateItem) =>
        lodash.some(
          payableExchangeRateFilterList,
          (item) =>
            item.exchangeType === exchangeRateItem.exchangeType &&
            item.toCurrency === exchangeRateItem.toCurrency &&
            item.fromCurrency === exchangeRateItem.fromCurrency
        )
      )
      .orderBy('effectiveDate', 'desc')
      .value();

    const newState = saveExchangeRate(draftState, {
      type: 'saveExchangeRate',
      payload: { exchangeRateList: filterExchangeRateList },
    });
    const newState2 = saveClaimPayablePolicyCurrency(newState, {
      type: 'saveClaimPayablePolicyCurrency',
      payload: {
        policyCurrency: null,
        payoutCurrency: claimDecision.payoutCurrency,
        payableId: null,
      },
    });

    return updatePayableAmountCallback(newState2);
  });
};

export default hanldExchangeRateForPolicy;
