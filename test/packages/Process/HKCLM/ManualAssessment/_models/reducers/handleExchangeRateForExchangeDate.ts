import { produce }  from 'immer';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { ExchangeType } from 'claim/pages/Enum';
import {
  filterExchangeRateListFn,
  filterAllExchangeRates,
  getExchangeRateValue,
} from 'claim/pages/utils/handleExchangeRate';
import { Modal } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import saveInvoiceCurrency from './saveInvoiceCurrency';
import hideExchangeDateModal from './hideExchangeDateModal';
import saveInvoiceItem from './saveInvoiceItem';
const handleExchangeRateForExchangeDate = (state: any, action: any) => {
  return produce(state, (draftState: any) => {
    let filterExchangeRateList: any[] = [];
    const {
      claimEntities: { invoiceListMap, invoicePayableListMap },
      exchangeRate,
    } = draftState;
    const { invoiceId, exchangeDate, oldExchangeDate } = action.payload;
    const { invoiceCurrency } = invoiceListMap[invoiceId];
    const systemCurrency = tenant.currency();
    const params = {
      exchangeTypeList: ExchangeType.External,
      fromCurrencyList: systemCurrency,
      toCurrencyList: null,
    };
    if (!lodash.isEmpty(invoicePayableListMap)) {
      const policyCurrencyList = lodash
        .chain(invoicePayableListMap)
        .filter((invoicePayableItem) => invoicePayableItem.invoiceId === invoiceId)
        .map((invoicePayableItem) => invoicePayableItem.policyCurrency)
        .value();
      params.toCurrencyList = policyCurrencyList[0]; // ???
    }
    if (!params.fromCurrencyList || !params.toCurrencyList) {
      return;
    }
    const response = filterAllExchangeRates(exchangeRate, params, true);
    if (!lodash.isEmpty(response)) {
      filterExchangeRateList = filterExchangeRateListFn(response);
    }
    const errorConfig = {
      content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000364' }),
      okText: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.receivedModalCancel' }),
    };
    if (!lodash.isEmpty(filterExchangeRateList)) {
      const invoicePayableList = lodash.filter(
        invoicePayableListMap,
        (payableItem: any) => payableItem.invoiceId === invoiceId
      );
      const result = lodash.map(invoicePayableList, (payable: any) => {
        const newRate = getExchangeRateValue({
          exchangeRateList: filterExchangeRateList,
          toCurrency: payable?.policyCurrency,
          fromCurrency: invoiceCurrency,
          exchangeDate,
        });
        return {
          isEqual: payable?.exchangeRateInvoicePolicy === lodash.toNumber(newRate).toFixed(6),
          rate: newRate,
        };
      });
      const allHasNewRate = lodash.every(result, (item: any) => item.rate);
      const allRateisEqual = lodash.every(result, (item: any) => item.isEqual);
      let newState2 =null;
      if (!allHasNewRate || !allRateisEqual) {
        const newState = saveInvoiceItem(draftState, {
          type: 'saveInvoiceItem',
          payload: {
            invoiceId,
            changedFields: { exchangeDate: oldExchangeDate },
          },
        });
        newState2 = saveInvoiceCurrency(newState, {
          type: 'saveInvoiceCurrency',
          payload: {
            invoiceCurrencyObj: {
              invoiceId,
              exchangeDate,
            },
          },
        });
      }
      if (!allHasNewRate) {
        Modal.error(errorConfig);
        return;
      }
      if (!allRateisEqual) {
        hideExchangeDateModal(newState2,{
          type: 'hideExchangeDateModal',
          payload: {
            exchangeDateModalShowStatus: true,
          },
        });
      }
    }else {
      saveInvoiceItem(draftState,{
        type: 'saveInvoiceItem',
        payload: {
          invoiceId,
          changedFields: { exchangeDate },
        },
      });
      Modal.error(errorConfig);
    }
  });
};

export default handleExchangeRateForExchangeDate;
