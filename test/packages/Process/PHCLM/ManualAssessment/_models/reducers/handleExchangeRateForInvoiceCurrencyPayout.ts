import { produce }  from 'immer';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { ExchangeType } from 'claim/pages/Enum';
import {
  filterExchangeRateListFn,
  filterAllExchangeRates,
} from 'claim/pages/utils/handleExchangeRate';
import saveExchangeRateForInvoiceCurrencyPayout from './saveExchangeRateForInvoiceCurrencyPayout'
import saveInvoiceItemRateCurrencyPayout from './saveInvoiceItemRateCurrencyPayout';
const handleExchangeRateForInvoiceCurrencyPayout = (state: any, { payload }: any) => {
  return produce(state, (draftState: any) => {
    let filterExchangeRateList = null;
    const {
      claimProcessData: { claimDecision },
      exchangeRate
    } = draftState;
    const systemCurrency = tenant.currency();
    const params = {
      exchangeType: [ExchangeType.External],
      currencyList: [systemCurrency, claimDecision?.payoutCurrency],
    };
      
    params.currencyList = lodash.uniq(params.currencyList);
    if (params.currencyList.length === 1) {
      return;
    }
    const exChangeRateList = filterAllExchangeRates(exchangeRate,params)
    if (!lodash.isEmpty(exChangeRateList)) {
      filterExchangeRateList = filterExchangeRateListFn(exChangeRateList);
    }
    const newState = saveExchangeRateForInvoiceCurrencyPayout(draftState, {
      type: 'saveExchangeRate',
      payload: { exchangeRateList: filterExchangeRateList },
    });
    saveInvoiceItemRateCurrencyPayout(newState,{type:'saveInvoiceItemRateCurrencyPayout'});
  });
};

export default handleExchangeRateForInvoiceCurrencyPayout;
