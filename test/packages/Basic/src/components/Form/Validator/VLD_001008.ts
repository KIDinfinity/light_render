import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

export const VLD_001008 = (data) => (rule: any, value: any, callback: Function) => {
  const eventList = formUtils.cleanValidateData(data);
  const isHaveValidity = eventList.some((item) => {
    return !!Number(item.validity || 0);
  });
  if (!isHaveValidity) {
    callback(formatMessageApi({ Label_COM_Message: 'MSG_001056' }));
  }
  callback();
};
