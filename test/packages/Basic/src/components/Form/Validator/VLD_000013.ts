import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000013 = ({ claimEntities, invoiceId }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const serviceItemList = claimEntities?.invoiceListMap[invoiceId].serviceItemList || [];
  const serviceItemListMap = claimEntities?.serviceItemListMap || [];

  const summaryOfServiceItem = lodash.reduce(
    serviceItemList,
    (totalAmount, id) => {
      const expenseValue = serviceItemListMap[id]?.expense;
      return expenseValue ? add(totalAmount, formUtils.queryValue(expenseValue)) : totalAmount;
    },
    0
  );

  if (value !== summaryOfServiceItem) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000025' }));
  }
  callback();
};
