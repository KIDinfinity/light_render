import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add, subtract } from '@/utils/precisionUtils';

export const getClaimResultUncoverAmount = ({
  invoiceListMap,
  invoicePayableListMap,
  claimPayableListMap,
}: any) => {
  const invoiceExpress = !lodash.isEmpty(invoiceListMap)
    ? lodash
        .chain(invoiceListMap)
        .values()
        .reduce((totalAmount: number, item: any) => {
          return add(totalAmount, formUtils.queryValue(item.expense) || 0);
        }, 0)
        .value() || 0
    : 0;

  const invoicePayable = !lodash.isEmpty(invoiceListMap)
    ? lodash
        .chain(invoicePayableListMap)
        .values()
        .reduce((totalAmount: number, item: any) => {
          return add(totalAmount, formUtils.queryValue(item.payoutAmount) || 0);
        }, 0)
        .value() || 0
    : 0;

  const deductibleNetExpense = !lodash.isEmpty(invoiceListMap)
    ? lodash
        .chain(claimPayableListMap)
        .values()
        .reduce((totalAmount: number, item: any) => {
          return add(totalAmount, formUtils.queryValue(item.deductibleNetExpense) || 0);
        }, 0)
        .value() || 0
    : 0;

  return add(subtract(invoiceExpress, invoicePayable), deductibleNetExpense);
};
