import { tenant } from '@/components/Tenant';
import { filterAllExchangeRates } from 'claim/pages/utils/handleExchangeRate';
import { ExchangeType } from 'claim/pages/Enum';
import { divide } from '@/utils/precisionUtils';
const getExchangeRateItem = (exchangeRate: any, el: any) => {
  const systemCurrency = tenant.currency();
  const { policyCurrency } = el || {};

  const params = {
    exchangeTypeList: ExchangeType.External,
    fromCurrencyList: policyCurrency,
    toCurrencyList: systemCurrency,
  };
  const response: any = filterAllExchangeRates(exchangeRate, params, true);
  const newExchangeRate = response?.[0]?.exchangeRate || 1;
  return {
    exchangeRatePolicyPayout: newExchangeRate,
    payoutToPolicyExchangeRate: divide(1, exchangeRate),
    policyCurrency,
  };
};
export default getExchangeRateItem;
