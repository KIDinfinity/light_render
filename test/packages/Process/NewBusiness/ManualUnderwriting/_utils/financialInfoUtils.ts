import { multiply } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export const calIncomeInLocalCurrency = (
  income: number,
  exchangeRate: Record<string, number>,
  localCurrency: string
) => {
  const incomeVal = formUtils.queryValue(income);
  const localCurrencyValue = formUtils.queryValue(localCurrency);
  if (lodash.some([incomeVal, exchangeRate, localCurrencyValue], (item) => lodash.isNil(item))) {
    return null;
  }
  if (!lodash.isNumber(incomeVal)) {
    return null;
  }
  const rate = lodash.get(exchangeRate, `${localCurrencyValue}`, 1);
  return multiply(incomeVal, rate);
};
