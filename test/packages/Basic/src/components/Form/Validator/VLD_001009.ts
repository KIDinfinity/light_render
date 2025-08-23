import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

export const VLD_001009 =
  (eventList, eventHistoryList, form) => (rule: any, value: any, callback: Function) => {
    const _eventList = formUtils.cleanValidateData(eventList);
    const validityData = _eventList.filter((item) => {
      return !!Number(item.validity || 0);
    });
    const totalValidity = validityData.length + eventHistoryList.length;
    // validity为true的才报错
    const validity = !!Number(form.getFieldValue('validity') || 0);
    if (validity && totalValidity > 3) {
      callback(formatMessageApi({ Label_COM_Message: 'MSG_001057' }));
    }
    callback();
  };
