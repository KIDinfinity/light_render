import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { add } from '@/utils/precisionUtils';
import { targetAccumulatorValue } from './targetAccumulatorValue';
import { isSkipCalculate } from './isSkipCalculate';

/**
 * 验证 accidentBenefitItem 是4.31,4.32时，check whether the accumulated payable days has reach to the limit value
 * @param benefitItemList 所有可选benefitItemList
 */
export const VLD_000200 = (listPolicy: any[], payableDaysList: any[]) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (isSkipCalculate(listPolicy, value)) return callback();
  if (value === '4.31' || value === '4.32') {
    const target = lodash.find(listPolicy, { benefitItemCode: value });
    const benefitItemName = lodash.get(target, 'benefitItemName');
    const accumulateLimitList = lodash.get(target, 'accidentBenefit.accumulateLimitList', []);
    const limitItem = lodash.find(accumulateLimitList, { limitCode: 'weeks_per_disability_limit' });
    const shareLimitItem = lodash.find(accumulateLimitList, {
      limitCode: 'share_weeks_per_disability_limit',
    });
    if (limitItem) {
      const shareItems = [value];
      const currentAccumulatorValue = targetAccumulatorValue({ shareItems, payableDaysList });
      if (add(limitItem?.accumulateValue, currentAccumulatorValue) >= limitItem?.limitValue * 7) {
        return callback(
          formatMessageApi(
            { Label_COM_WarningMessage: 'ERR_000197' },
            `${value}-${benefitItemName}`
          )
        );
      }
    }
    if (shareLimitItem) {
      const shareItems = lodash.split(shareLimitItem?.shareItems || '', ';');
      const shareAccumulatorValue = targetAccumulatorValue({ shareItems, payableDaysList });
      if (
        add(shareLimitItem?.accumulateValue, shareAccumulatorValue) >=
        shareLimitItem?.limitValue * 7
      ) {
        return callback(
          formatMessageApi(
            { Label_COM_WarningMessage: 'ERR_000197' },
            `${value}-${benefitItemName}`
          )
        );
      }
    }
  }
  return callback();
};
