import { safeParseUtil } from '@/utils/utils';
import { formUtils } from 'basic/components/Form';
import { isNumber } from 'lodash';

/**
 * 计算 exchangeRate amount
 * @param amount 转换金额
 * @param exchangeRateRecord 汇率记录
 */
const calcRedepositConvertedAmount = (amount?: number | null, exchangeRateRecord?: string) => {
  if (!amount) return 0;
  if (!exchangeRateRecord) return 0;

  const exchangeRateObjList = safeParseUtil(exchangeRateRecord);
  const exchangeRateObj = exchangeRateObjList[0];
  if (exchangeRateObj?.exchangeRate && isNumber(exchangeRateObj.exchangeRate)) {
    return formUtils.queryValue(amount) * exchangeRateObj.exchangeRate;
  }
  return 0;
};

export default calcRedepositConvertedAmount;
