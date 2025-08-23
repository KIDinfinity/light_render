import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { multiply } from '@/utils/precisionUtils';
import { getExchangeRateValue, mapRateList } from 'claim/pages/utils/handleExchangeRate';

/**
 * 转换汇率
 * exchangeRateList - 汇率列表
 * amount - 需要转换的值
 * fromCurrency - 来源货币
 * toCurrency - 目标货币
 */
export default ({ exchangeRateList, amount, fromCurrency, toCurrency }: any) => {
  const systemCurrency = tenant.currency();

  const matchExchangeRate = lodash.filter(exchangeRateList, { fromCurrency, toCurrency });

  const payoutExchangeRate = +getExchangeRateValue({
    exchangeRateList: matchExchangeRate,
    fromCurrency: fromCurrency || systemCurrency,
    toCurrency,
  });

  return {
    amount: +Number(multiply(payoutExchangeRate, Number(amount))).toFixed(2),
    payoutExchangeRate:
      +getExchangeRateValue({
        exchangeRateList: matchExchangeRate,
        fromCurrency: fromCurrency || systemCurrency,
        toCurrency,
      }) || '',
    exchangeRateRecords:
      mapRateList(matchExchangeRate, {
        fromCurrency: fromCurrency || systemCurrency,
        toCurrency,
      }) || '',
  };
};
