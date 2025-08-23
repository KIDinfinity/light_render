import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { tenant } from '@/components/Tenant';
import { getExchangeRateByCurrency } from '@/services/miscExchangeRateControllerService';
import { ExchangeType } from 'claim/pages/Enum';
import { filterExchangeRateListFn } from 'claim/pages/utils/handleExchangeRate';

export default function* getExchangeRateForInvoice({ payload }: any, { put, call, select }: any) {
  const claimEntities = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );

  const { policyCurrency, payableId, invoicePayableItemId, invoiceItem } = payload;
  const { invoicePayableListMap } = claimEntities;
  const invoiceItemId = lodash.find(
    invoicePayableListMap,
    (item) => item.payableId === payableId
  )?.invoiceId;
  const getInvoiceItem = claimEntities.invoiceListMap[invoiceItemId];
  if (!getInvoiceItem && !invoiceItem) return;
  const { invoiceCurrency, exchangeDate } = getInvoiceItem || invoiceItem;
  const systemCurrency = tenant.currency();

  const params = {
    exchangeTypeList: [ExchangeType.External],
    fromCurrencyList: [systemCurrency, invoiceCurrency],
    lookupDateList: [exchangeDate],
    toCurrencyList: [systemCurrency, policyCurrency],
  };

  params.fromCurrencyList = lodash.chain(params.fromCurrencyList).uniq().compact().value();
  params.toCurrencyList = lodash.chain(params.toCurrencyList).uniq().compact().value();

  const response = yield call(getExchangeRateByCurrency, params);

  if (response && response.success && response.resultData) {
    const filterExchangeRateList = filterExchangeRateListFn(response.resultData);
    yield put({
      type: 'saveExchangeRateForInvoice',
      payload: { exchangeRateListForInvoice: filterExchangeRateList },
    });

    yield put({
      type: 'saveInvoicePayablePolicyCurrency',
      payload: {
        invoicePayableItemId,
        invoiceCurrency,
        policyCurrency,
        payableId,
      },
    });
  }
}
