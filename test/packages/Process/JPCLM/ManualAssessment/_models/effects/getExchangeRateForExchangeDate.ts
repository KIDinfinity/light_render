import lodash from 'lodash';
import { Modal } from 'antd';
import { tenant } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getExchangeRateByCurrency } from '@/services/miscExchangeRateControllerService';
import { ExchangeType } from 'claim/pages/Enum';
import { getExchangeRateValue } from 'claim/pages/utils/handleExchangeRate';

export default function* getExchangeRateForExchangeDate(
  { payload }: any,
  { put, select, call }: any
) {
  const { invoiceListMap, invoicePayableListMap } = yield select(
    (state: any) => state.JPCLMOfClaimAssessment.claimEntities
  );
  const { invoiceId, exchangeDate, oldExchangeDate } = payload;
  const { invoiceCurrency } = invoiceListMap[invoiceId];
  const systemCurrency = tenant.currency();

  const params = {
    exchangeTypeList: [ExchangeType.External],
    fromCurrencyList: [systemCurrency, invoiceCurrency],
    lookupDateList: [exchangeDate],
    toCurrencyList: [systemCurrency],
  };

  if (!lodash.isEmpty(invoicePayableListMap)) {
    const policyCurrencyList = lodash
      .chain(invoicePayableListMap)
      .filter((invoicePayableItem) => invoicePayableItem.invoiceId === invoiceId)
      .map((invoicePayableItem) => invoicePayableItem.policyCurrency)
      .value();
    params.toCurrencyList.push(...policyCurrencyList);
  }
  params.fromCurrencyList = lodash.uniq(params.fromCurrencyList);
  params.toCurrencyList = lodash.uniq(params.toCurrencyList);

  if (params.fromCurrencyList.length === 1 && params.toCurrencyList.length === 1) {
    return;
  }
  const response = yield call(getExchangeRateByCurrency, params);
  const errorConfig = {
    content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000364' }),
    okText: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.receivedModalCancel' }),
  };

  if (response && response.success && !lodash.isEmpty(response.resultData)) {
    const invoicePayableList = lodash.filter(
      invoicePayableListMap,
      (payableItem: any) => payableItem.invoiceId === invoiceId
    );
    const result = lodash.map(invoicePayableList, (payable: any) => {
      const newRate = getExchangeRateValue({
        exchangeRateList: response.resultData,
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
    if (!allHasNewRate || !allRateisEqual) {
      yield put({
        type: 'saveInvoiceItem',
        payload: {
          invoiceId,
          changedFields: { exchangeDate: oldExchangeDate },
        },
      });
      yield put({
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
      yield put({
        type: 'hideExchangeDateModal',
        payload: {
          exchangeDateModalShowStatus: true,
        },
      });
    }
  } else {
    yield put({
      type: 'saveInvoiceItem',
      payload: {
        invoiceId,
        changedFields: { exchangeDate },
      },
    });
    Modal.error(errorConfig);
  }
}
