import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { getExchangeRateByCurrency } from '@/services/miscExchangeRateControllerService';
import { ExchangeType } from 'claim/pages/Enum';
import { filterExchangeRateListFn } from 'claim/pages/utils/handleExchangeRate';

export default function* getExchangeRateForInvoiceCurrencyPayout(
  _: any,
  { put, select, call }: any
) {
  const { claimProcessData, claimEntities } = yield select(
    (state: any) => state.JPCLMOfClaimAssessment
  );

  const { invoiceListMap } = claimEntities;

  const { claimDecision } = claimProcessData;
  const systemCurrency = tenant.currency();

  const params = {
    exchangeTypeList: [ExchangeType.External],
    fromCurrencyList: [systemCurrency],
    lookupDateList: [] as any,
    toCurrencyList: [systemCurrency, claimDecision?.payoutCurrency],
  };

  lodash.forEach(invoiceListMap, (invoiceItem) => {
    const InvoiceCurrencyVal = invoiceItem?.invoiceCurrency;
    const exchangeDateVal = invoiceItem?.exchangeDate;
    params.fromCurrencyList.push(InvoiceCurrencyVal);
    params.lookupDateList.push(exchangeDateVal);
  });

  params.fromCurrencyList = lodash.uniq(params.fromCurrencyList);
  params.toCurrencyList = lodash.uniq(params.toCurrencyList);

  if (params.fromCurrencyList.length === 1 && params.toCurrencyList.length === 1) {
    return;
  }
  const response = yield call(getExchangeRateByCurrency, params);

  if (response && response.success && response.resultData) {
    const filterExchangeRateList = filterExchangeRateListFn(response.resultData);
    yield put({
      type: 'saveExchangeRateForInvoiceCurrencyPayout',
      payload: { exchangeRateListForInvoiceCurrencyPayout: filterExchangeRateList },
    });

    yield put({
      type: 'saveInvoiceItemRateCurrencyPayout',
    });
  }
}
