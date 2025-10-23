import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';

export const targetAccumulatorValue = ({ shareItems, payableDaysList }: any): number =>
  lodash.reduce(
    shareItems,
    (result: number, item: any): number => {
      const target = lodash.filter(
        payableDaysList,
        (paydaysItem: any) => formUtils.queryValue(paydaysItem?.benefitItemCode) === item
      );
      const payDaysTemp: number = lodash.reduce(
        target,
        (payDaysResult, paydaysItem) =>
          add(payDaysResult, formUtils.queryValue(paydaysItem?.payableDays)),
        0
      );
      return add(result, payDaysTemp);
    },
    0
  );
