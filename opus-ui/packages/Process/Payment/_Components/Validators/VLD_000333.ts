import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

/**
 *
 * @param payeeBankAccountList  校验bank account是否重复
 * Validate if there are duplicate records with
 * the same account holder and account number
 * when adding/modifying bank account records
 */

export const VLD_000333 = (payeeList, CurrentPayee) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const payeeBankAccountList = lodash.chain(CurrentPayee).get('[0].payeeBankAccountList').value();

  let arr: any = []; // 先装已有的

  const hasError = lodash
    .chain(formUtils.cleanValidateDataOfDataCapture(payeeBankAccountList))
    .map((item: any) => {
      // 只更新最后一个位置的值，对家数据不可编辑
      return item.id === payeeBankAccountList[payeeBankAccountList.length - 1].id
        ? {
            ...item,
            bankAccountNo: value,
          }
        : item;
    })
    .reduce((isMultiple: boolean, item: any) => {
      const bankAccountNo = item.bankAccountNo;
      if (
        lodash.includes(arr, bankAccountNo) &&
        (item.isNewBankAccount === 'Y' || item.manualAdd === 'Y')
      ) {
        return true;
      }
      arr = [...arr, bankAccountNo];
      return isMultiple;
    }, false)
    .value();
  return !!hasError
    ? callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000361' }))
    : callback();
};
