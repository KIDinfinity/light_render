import { produce }  from 'immer';
import lodash from 'lodash';
import {
  mapRateList,
  getExchangeRateValue,
} from 'claim/pages/utils/handleExchangeRate';

const supplementExchangeRate = ({ listMap, payableId, exchangeRate, exchangeRecord }: any) => {
  return lodash.forEach(listMap, (payable) => {
    if (payable.invoicePayableId === payableId) {
      payable.exchangeRateInvoicePolicy = exchangeRate;
      payable.exchangeRateRecord = exchangeRecord;
    }
  });
};

const saveInvoicePayablePolicyCurrency = (state: any, action: any) => {
  const nextState = produce(state, (draftState) => {
    const { invoicePayableItemId, invoiceCurrency, policyCurrency, payableId } = action.payload;
    const { exchangeRateListForInvoice, claimEntities } = draftState;
    const { serviceItemPayableListMap } = claimEntities;
    const exchangeRate = getExchangeRateValue({
      exchangeRateList: exchangeRateListForInvoice,
      toCurrency: policyCurrency,
      fromCurrency: invoiceCurrency,
    });
    const newRecord = mapRateList(exchangeRateListForInvoice, {
      fromCurrency: invoiceCurrency,
      toCurrency: policyCurrency,
    });
    if (invoicePayableItemId) {
      const invoicePayableItem = claimEntities.invoicePayableListMap[invoicePayableItemId];
      draftState.claimEntities.invoicePayableListMap[invoicePayableItemId] = {
        ...invoicePayableItem,
        exchangeRateInvoicePolicy: exchangeRate,
        exchangeRateRecord: newRecord,
      };
      // serviceItem 补充exchangeRate exchangeRateRecord
      supplementExchangeRate({
        listMap: serviceItemPayableListMap,
        payableId: invoicePayableItemId,
        exchangeRate,
        exchangeRecord: newRecord,
      });
    }
    if (payableId) {
      lodash.forEach(claimEntities.invoicePayableListMap, (item) => {
        if (item.payableId === payableId) {
          draftState.claimEntities.invoicePayableListMap[item.id] = {
            ...item,
            exchangeRateInvoicePolicy: exchangeRate,
            exchangeRateRecord: newRecord,
          };
          supplementExchangeRate({
            listMap: serviceItemPayableListMap,
            payableId: item.id,
            exchangeRate,
            exchangeRecord: newRecord,
          });
        }
      });
    }
  });
  return { ...nextState };
};

export default saveInvoicePayablePolicyCurrency;
