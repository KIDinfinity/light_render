import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import BreakDown from 'basic/enum/Breakdown';
import { formUtils } from 'basic/components/Form';

export const VLD_000663 = (serviceItem: any) => (rule: any, value: any, callback: Function) => {
  const breakdownTotalValue = lodash.reduce(
    serviceItem?.claimServiceItemBreakDownList,
    (sum: number, item: any) => {
      return sum + (formUtils.queryValue(item[rule.field]) || 0);
    },
    0
  );

  if (
    Number(breakdownTotalValue) !== (Number(value) || 0) &&
    serviceItem?.requireBreakdown === BreakDown.YES
  ) {
    callback(formatMessageApi({ Dropdown_CFG_MessageCode: 'MSG_000602' }));
    return;
  }
  callback();
};
