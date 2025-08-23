import { produce } from 'immer';
import lodash from 'lodash';
import {
  getExchangeRateValue,
  filterExchangeRateListFn,
} from 'claim/pages/utils/handleExchangeRate';

const saveInvoiceItemRateCurrencyPayout = (state: any) => {
  const nextState = produce(state, (draftState) => {
    const { exchangeRateListForInvoiceCurrencyPayout, claimProcessData, claimEntities } =
      lodash.pick(draftState, [
        'exchangeRateListForInvoiceCurrencyPayout',
        'claimProcessData',
        'claimEntities',
      ]);
    const { claimDecision } = claimProcessData;
    const { invoiceListMap } = claimEntities;
    lodash.forEach(invoiceListMap, (invoiceItem) => {
      const InvoiceCurrencyVal = invoiceItem?.invoiceCurrency;
      const exchangeDateVal = invoiceItem?.exchangeDate;
      const newExchangeRateList = filterExchangeRateListFn(
        exchangeRateListForInvoiceCurrencyPayout,
        exchangeDateVal
      );
      const exchangeRate = getExchangeRateValue({
        exchangeRateList: newExchangeRateList,
        toCurrency: claimDecision?.payoutCurrency,
        fromCurrency: InvoiceCurrencyVal,
      });
      invoiceItem.exchangeRateInvoicePayout = exchangeRate;
    });
  });
  return { ...nextState };
};

export default saveInvoiceItemRateCurrencyPayout;
