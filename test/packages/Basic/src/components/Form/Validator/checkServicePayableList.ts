import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';

// 验证service 匹配的servicePayableList是否有重复项
export const checkServicePayableList = (
  curServicePayableList: any,
  servicePayableListItem: any
) => (rule: any, value: any, callback: Function) => {
  const editPayable = formUtils.cleanValidateData(servicePayableListItem);
  // 剔除当前servicePayable
  const servicePayableList = lodash.filter(
    curServicePayableList,
    (item) => item.id !== editPayable.id
  );
  const cleanServicePayableList = formUtils.cleanValidateData(servicePayableList);

  const payable = lodash.filter(
    cleanServicePayableList,
    (payableItem) =>
      payableItem.serviceItemId === editPayable.serviceItemId &&
      filterDuplicatePayable(payableItem, editPayable, value)
  );
  if (payable.length > 0) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
  }
  callback();
};
