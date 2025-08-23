import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';

export const VLD_000802 = () => (rule: any, value: any, cb: Function) => {
  const today = new Date();
  const valueDate = new Date(value);
  const dayDiff = moment([today.getFullYear(), today.getMonth(), today.getDate()]).diff(
    [valueDate.getFullYear(), valueDate.getMonth(), valueDate.getDate()],
    'days'
  );
  if (dayDiff > 365) {
    cb(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000792' }));
  }
  cb();
};
