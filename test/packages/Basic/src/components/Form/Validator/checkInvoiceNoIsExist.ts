import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

// 验证invoiceNo重复
export const checkInvoiceNoIsExist = (invoiceList: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const invoiceNoArray = lodash
    .values(invoiceList)
    .filter((item: any) => formUtils.queryValue(item.invoiceNo) === value);

  if (invoiceNoArray && invoiceNoArray.length > 1) {
    callback('Duplicated with existing Invoice.');
  }
  callback();
};
