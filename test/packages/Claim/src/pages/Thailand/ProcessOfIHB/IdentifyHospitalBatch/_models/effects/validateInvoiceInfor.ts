import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const invoiceInforRequireOfHasIdentityNoArr: string[] = ['invoiceNo', 'visitDate', 'amount'];
const invoiceInforRequireOfNotIdentityNoArr: string[] = [
  'invoiceNo',
  'firstName',
  'lastName',
  'visitDate',
  'amount',
];

export default function validateInvoiceInfor({ payload }: any) {
  const arr: string[] = [];
  const { invoiceInfor } = payload;
  lodash.forEach(invoiceInfor, (item) => {
    const requireArr = !lodash.isEmpty(formUtils.queryValue(item?.identityNo))
      ? invoiceInforRequireOfHasIdentityNoArr
      : invoiceInforRequireOfNotIdentityNoArr;
    lodash.mapKeys(item, (val, key) => {
      if (
        lodash.includes(requireArr, key) &&
        lodash.isObject(val) &&
        lodash.get(val, 'errTip') !== ''
      ) {
        arr.push('');
      }
    });
  });
  return arr;
}
