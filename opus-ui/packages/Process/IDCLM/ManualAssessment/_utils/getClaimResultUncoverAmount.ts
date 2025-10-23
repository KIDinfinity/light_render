import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export const getClaimResultUncoverAmount = ({ invoiceListMap, invoicePayableListMap }: any) => {
  const invoiceExpress = !lodash.isEmpty(invoiceListMap)
    ? lodash
        .chain(invoiceListMap)
        .values()
        .reduce((totalAmount: number, item: any) => {
          return totalAmount + Number(formUtils.queryValue(item.expense));
        }, 0)
        .value() || 0
    : 0;

  const invoicePayable = !lodash.isEmpty(invoiceListMap)
    ? lodash
        .chain(invoicePayableListMap)
        .values()
        .reduce((totalAmount: number, item: any) => {
          return totalAmount + Number(formUtils.queryValue(item.payoutAmount));
        }, 0)
        .value() || 0
    : 0;

  return Number(invoiceExpress) - Number(invoicePayable);
};
