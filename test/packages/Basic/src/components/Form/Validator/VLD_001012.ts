// 验证时间大小
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
// 判断dateA不能早于dateB
export const VLD_001012 =
  (dateAObj, dateB, dateBname) => (rule: any, value: any, callback: Function) => {
    const { form, fieldName } = dateAObj;
    const dateA = form.getFieldValue(fieldName);
    if (moment(dateA).valueOf() < moment(dateB).valueOf()) {
      callback(formatMessageApi({ Label_COM_Message: 'MSG_000529' }, dateBname));
    }
    callback();
  };
