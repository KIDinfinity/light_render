import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { add } from '@/utils/precisionUtils';
import { targetAccumulatorValue } from './targetAccumulatorValue';
import { isSkipCalculate } from './isSkipCalculate';

const getBenefitItem = (listPolicy: any[], benefitItemCode: string) => {
  const target = lodash.find(listPolicy, { benefitItemCode });
  return `${benefitItemCode}-${lodash.get(target, 'benefitItemName')}`;
};

export const VLD_000201 = (listPolicy: any[], payableDaysList: any[]) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (isSkipCalculate(listPolicy, value)) return callback();
  if (value === '4.40') {
    const targetList = lodash
      .chain(listPolicy)
      .map((item: any) => {
        const list = lodash.get(item, 'accidentBenefit.accumulateLimitList', []);
        return lodash.some(list, (target) => target?.rolloverBenefitItemCode === '4.40')
          ? item
          : '';
      })
      .compact()
      .value();
    const rolloverBenefitItemCodes = lodash.map(targetList, (item: any) => {
      const accumulateLimitList = lodash.get(item, 'accidentBenefit.accumulateLimitList', []);
      if (lodash.find(accumulateLimitList, { limitCode: 'share_weeks_per_lifetime_rollover' })) {
        return item?.benefitItemCode;
      }
      return '';
    });
    const rollovers = lodash
      .chain(targetList)
      .map((item: any) => {
        const accumulateLimitList = lodash.get(item, 'accidentBenefit.accumulateLimitList', []);
        if (lodash.find(accumulateLimitList, { limitCode: 'weeks_per_disability_rollover' })) {
          return item;
        }
        return '';
      })
      .value();

    const singerRollover = lodash.every(rollovers, (item: any) => {
      const accumulateLimitList = lodash.get(item, 'accidentBenefit.accumulateLimitList', []);
      const limitItem = lodash.find(accumulateLimitList, {
        limitCode: 'weeks_per_disability_rollover',
      });

      const { benefitItemCode = '' } = limitItem ? item : {};
      const currentRolloverBenefitItemCodes = [benefitItemCode];
      const currentAccumulatorValue = targetAccumulatorValue({
        shareItems: currentRolloverBenefitItemCodes,
        payableDaysList,
      });
      if (
        limitItem &&
        add(limitItem?.accumulateValue, currentAccumulatorValue) < limitItem?.limitValue * 7
      ) {
        return true;
      }
      return false;
    });
    const shareLimitItem: any = lodash.reduce(
      targetList,
      (result: any, item: any) =>
        lodash.find(item?.accidentBenefit?.accumulateLimitList, {
          limitCode: 'share_weeks_per_lifetime_rollover',
        }),
      {}
    );
    if (singerRollover && !shareLimitItem) {
      callback(
        formatMessageApi(
          { Label_COM_WarningMessage: 'ERR_000198' },
          getBenefitItem(listPolicy, '4.40'),
          getBenefitItem(listPolicy, '4.31'),
          getBenefitItem(listPolicy, '4.32')
        )
      );
    }

    const currentShareAccumulatorValue = targetAccumulatorValue({
      shareItems: lodash.compact(rolloverBenefitItemCodes),
      payableDaysList,
    });
    if (
      shareLimitItem &&
      add(shareLimitItem?.accumulateValue, currentShareAccumulatorValue) <
        shareLimitItem?.limitValue * 7
    ) {
      return callback(
        formatMessageApi(
          { Label_COM_WarningMessage: 'ERR_000198' },
          getBenefitItem(listPolicy, '4.40'),
          getBenefitItem(listPolicy, '4.31'),
          getBenefitItem(listPolicy, '4.32')
        )
      );
    }
  }
  return callback();
};
