import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';

export const checkPayableList = (payableList: any, payableListItem: any, mapId: string) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const editPayable = formUtils.cleanValidateData(payableListItem);
  const filterPayableList = lodash.filter(payableList, (item) => item.id !== editPayable.id);
  const cleanPayableList = formUtils.cleanValidateData(filterPayableList);

  const payable = lodash.filter(
    cleanPayableList,
    (payableItem: any) =>
      payableItem[mapId] === editPayable[mapId] &&
      payableItem?.incidentId === editPayable.incidentId &&
      filterDuplicatePayable(payableItem, editPayable, value)
  );
  if (payable.length > 0) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
  }
  callback();
};
