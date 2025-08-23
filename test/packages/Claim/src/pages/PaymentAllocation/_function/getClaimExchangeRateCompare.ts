import { safeParseUtil } from '@/utils/utils';
import lodash from 'lodash';
import moment from 'moment';
/**
 * 获取影响受益人分配结果的claim exchangeRateRecord 日期数据以供对比
 * 对比 汇率 日期
 * @param exchangeRateRecord claim exchangeRateRecord
 */
const getClaimExchangeRateCompare = (exchangeRateRecord: string) => {
  if (lodash.isEmpty(exchangeRateRecord)) return '';
  const exchangeRateObjList = safeParseUtil(exchangeRateRecord);
  const effectiveDate = exchangeRateObjList?.[0]?.effectiveDate;
  if (!effectiveDate) return '';
  const dateString = moment(effectiveDate).format('YYYY-MM-DD');

  return dateString;
};

export default getClaimExchangeRateCompare;
